const { pubRedisClient } = require("../utils/RedisClinet");

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
