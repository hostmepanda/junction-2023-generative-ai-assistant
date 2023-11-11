import express from 'express';
import * as http from "http";
import { Server } from 'socket.io';
import cors from 'cors';

const APP_LISTEN_PORT =4000;
const app = express();
const corsOpts = {
  origin: '*'
};

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOpts,
});

io.on('connection', (socket) => {
  console.log('Socket: incoming connection');
  socket.on("disconnect", () => console.log("Client disconnected"));
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(APP_LISTEN_PORT, () => {
  console.log(`App is started on port: ${APP_LISTEN_PORT}`);
});