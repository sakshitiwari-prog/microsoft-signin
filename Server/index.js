const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const userRouter = require("./routes/user-routes");
const { socketInit } = require("./controllers/user-controller");
const chats= require("./data");
const dotenv=require('dotenv')
const app = express();
dotenv.config();
const httpServer = createServer(app);
app.use(cors({ origin: "*" }));

require("./config/db");
app.use(express.json());
// app.get("/", (req, res) => {
//   console.log("hy",chats);
//   res.send(chats);
//   console.log("by");
// });
app.get("/:id", (req, res) => {
  console.log(chats,"hy");
  const singleChat=chats.find((chat)=>chat._id===req.params.id)
  
  res.send(singleChat);
  console.log("by",singleChat);
});
app.use("/api", userRouter);
const PORT=process.env.PORT || 5000
console.log(PORT,'PORT')
httpServer.listen(PORT, () => {
  socketInit(httpServer);
});
