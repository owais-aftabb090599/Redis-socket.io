const app = require("./app.js");
const port = 3001;
const { createServer } = require("http");
const server = createServer(app);
const socket = require("./utils/Socket");
const io = socket.init(server);
const pubRedisClient = require("./utils/RedisClinet.js").pubRedisClient;
const subRedisClient = require("./utils/RedisClinet.js").subRedisClient;
const { createAdapter } = require("@socket.io/redis-adapter");

pubRedisClient.on("ready", (err) => {
  if (err) {
    console.log("Redis Client Connection Failed", err);
  }
  console.log("Redis Client Connected");
});

io.adapter(createAdapter(pubRedisClient, subRedisClient));

io.on("connection", async (socket) => {
  console.log(`A User Joined With SocketId ${socket.id}`);

  const newMessages = await subRedisClient.subscribe("chatting", (message) => {
    console.log("New Message", message);
    io.emit("newMessage", message);
  });

  socket.on("storeInputValues", async (data) => {
    const inputValues = await pubRedisClient.set("inputValues", JSON.stringify(data));
  });

  socket.on("disconnect", (reason) => {
    console.log("### Socket IO client disconnected");
  });
});

Promise.all([pubRedisClient.connect(), subRedisClient.connect()]).catch((err) =>
  console.log(`Error ${err}`)
);

server.listen(port, () => {
  console.log("Server listening on port 3001");
});
