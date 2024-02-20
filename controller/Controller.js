const { pubRedisClient } = require("../utils/RedisClinet");
const jwt = require("jsonwebtoken");

exports.Chatting = async (req, res, next) => {
  const { name, msg } = req.body;

  if (!name && !msg) {
    return res.status(200).json({
      success: false,
      message: "Please Enter Name ANd Message",
      data: null,
    });
  }
  console.log(`Message From =>${name}: ${msg}`);

  const publishedMessage = await pubRedisClient.publish("chatting", msg);

  return res.status(200).json({
    success: false,
    message: "Message Published",
    data: publishedMessage,
  });
};

exports.InitialInputValues = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const data = await pubRedisClient.get(`${decoded._id}InputValues`);

  if (!data) {
    return res.status(200).json({
      success: true,
      message: "No Initial Input Values",
      data: null,
    });
  }
  return res.status(200).json({
    success: true,
    message: "Initial Input Values",
    data: JSON.parse(data),
  });
};
