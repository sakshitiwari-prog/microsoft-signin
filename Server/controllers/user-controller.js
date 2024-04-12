const counterModal = require("../modals/counter-modal");
const User = require("../modals/user-modal");

var bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(`error is ${error}`);
  }
  if (!users) {
    res.status(404).json({ message: "users are not found" });
  }
  res.status(200).json({ users });
};

const signUp = async (req, res, next) => {
  let counter = await counterModal.findOne({ id: "autoval" });
  if (!counter) {
    console.log("inside if");
    counter = new counterModal({ id: "autoval", seq: 1 });
    await counter.save();
  } else {
    console.log("inside else");
    counter.seq++;
    await counter.save();
  }

  const { email, password, fname, lname } = req.body;
  console.log(req.body);
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(404).json({ message: "user already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = new User({
    userId: counter.seq,
    fname,
    lname,
    email,
    password: hashedPassword,
  });
  try {
    newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {}
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser = await User.findOne({ email });
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  let token;
  if (!existingUser) {
    res.status(404).json({ message: "User is not found" });
  } else if (!isPasswordCorrect) {
    res.status(400).json({ message: "Incorrect Password" });
  } else {
    console.log(existingUser.userId, "existingUser.userId");
    token = await existingUser.generateToken({
      userId: existingUser.userId,
      email: existingUser.email,
    });
    res.status(200).json({ user: existingUser, token });
  }
};

const updateProfile = async (req, res, next) => {
  const { userId, name, email } = req.body;
  let filter = { userId };

  if (userId) {
    let updatedData = await User.findOneAndUpdate(
      filter,
      {
        email,
        name,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ user: updatedData });
  } else {
    res.status(403).json({ message: "Missing user ID" });
  }
};
const socket = require("socket.io");
let onlineUser = [];

const addUser = (user, socketId) => {
  const existingUserIndex = onlineUser.findIndex(
    (item) => item.userData.userId === user.userData.userId
  );

  if (existingUserIndex !== -1) {
    // If the user already exists, update the socketId
    onlineUser[existingUserIndex].socketId = socketId;
  } else {
    // If the user does not exist, add the user to the onlineUser array
    user.socketId = socketId;
    onlineUser.push(user);
  }
  console.log("====================================");
  console.log(onlineUser, "onlineUser");
  console.log("====================================");
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
    console.log(socket.id, "socket.id");
    socket.on("Add_User", (user) => {
      // console.log(user, "user");
      addUser(user, socket.id);
      socket.emit("User_Added", onlineUser);
    });
    socket.on("Send_Msg", (msgData) => {
      console.log(msgData, "msg");
      // socket.broadcast.emit("Reciever_Msg", msgData);
      io.to(msgData.reciever.socketId).emit("Reciever_Msg", msgData);
      // io.broadcast.emit("Reciever_Msg", msgData);
    });
    socket.on("Logout", () => {
      removeUser(socket.id);
      io.emit("User_Added", onlineUser);
    });
  });
};
module.exports = socketInit;

module.exports = { getAllUser, signUp, signIn, socketInit, updateProfile };
