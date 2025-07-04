import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


let items = []; // In-memory storage for now

app.get("/items", (req, res) => {
  res.json(items);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("createItem", (item) => {
    const newItem = {
      ...item,
      id: item.id,
      currentBid: Number(item.startingBid),
      status: "active",
      name: item.name,
      description: item.description,
      startingBid: Number(item.startingBid),
      endTime: item.endTime
    };

    items.push(newItem);
    io.emit("newItem", newItem); // Broadcast to all clients
  });

  socket.on("placeBid", ({ itemId, bidAmount, maxBid, userId }) => {
    const index = items.findIndex((i) => i.id === itemId);
    if (index !== -1 && bidAmount > items[index].currentBid) {
      items[index].currentBid = bidAmount;
      items[index].lastBidder = userId;
      console.log(items[index]);
      io.emit("updateItem", items[index]);
    }
  });

  console.log("Client disconnected:", socket.id);
});

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port", process.env.PORT || 5000)
);
