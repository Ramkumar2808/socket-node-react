// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send random data every second
  const interval = setInterval(() => {
    const randomData = generateRandomData();
    console.log("Generated random data:", randomData);

    // Send the random data to the connected client
    socket.emit("randomData", randomData);
  }, 1000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval); // Stop sending random data when client disconnects
  });
});

function generateRandomData() {
  // Generate random data here (replace this with your own logic)
  const randomValue = Math.random() * 100;
  return { value: randomValue };
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
