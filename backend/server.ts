import router from "./routes";
import mongoose from "mongoose";
import { configConstants } from "./config";
import { scrapingService } from "./modules/scraping/scraping.service";
import { Chat } from "./modules/messages/chat";
import { chatService } from "./modules/messages/chat.service";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);

// Express App Config
app.use(bodyParser.json());

const corsOptions = {
  origin: [
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:3030",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

mongoose
  .connect(`${configConstants.mongoUrl}/${configConstants.dbName}`)
  .then(() => console.log("Connected to db"));

//Register routes with prefix
app.use("/api/", router);

const io = require("socket.io")(http, {
  cors: {
    origin: corsOptions.origin,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("chat message", async (msg: string) => {
    await chatService.addMessage(msg);
    io.emit("chat message", msg);
  });
});

const port = process.env.PORT || 3030;
http.listen(port, async () => {
  console.log("Server is running on port: " + port);
  if (!(await scrapingService.isScraped())) {
    await scrapingService.scrape();
  }
});
