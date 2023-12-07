import express from "express";
import Gun from "gun";
import { Server } from "http";
const port = process.env.PORT || 3000;
const app = express();
const server = new Server(app);

server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});

const gun = Gun({
  file: "data",
  web: server,
});

gun.on("create", (root) => {
  console.log("Gun created");
});
