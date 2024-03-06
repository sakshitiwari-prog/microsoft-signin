const socket = require("socket.io");
let onlineUser = [];
const addUser = (user, socketId) => {
  let isExist = onlineUser.findIndex(
    (item) => item.userData.userId == user.userData.userId
  );
  if (isExist !== -1) {
    onlineUser.splice(isExist, 1);
  }
  user.socketId = socketId;
  onlineUser.push(user);
  // console.log(onlineUser, "onlineUser");
};
const removeUser = (socketId) => {
  let isExist = onlineUser.findIndex((item) => item.socketId === socketId);
  if (isExist !== -1) {
    onlineUser.splice(isExist, 1);
  }
};
const socketInit = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*", // Allow requests from any origin
    },
  });
  io.on("connection", (socket) => {
    // ...
    // console.log(socket === io);
    socket.on("Add_User", (user) => {
      // console.log(user, "user");
      addUser(user, socket.id);
      socket.emit("User_Added", onlineUser);
    });
    socket.on("Send_Msg", (msgData) => {
      console.log(msgData, "msg");
      io.to(msgData.reciever.socketId).emit("Reciever_Msg", msgData);
    });
    socket.on("Logout", () => {
      removeUser(socket.id);
      io.emit("User_Added", onlineUser);
    });
  });
};
module.exports = socketInit;
