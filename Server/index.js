const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const userRouter = require("./routes/user-routes");
const socketInit = require("./config/socket");

const app = express();

const httpServer = createServer(app);
app.use(cors({ origin: "*" }));

require("./config/db");
app.use(express.json());
app.use("/api", userRouter);
httpServer.listen(5000, () => {
  socketInit(httpServer);
});
