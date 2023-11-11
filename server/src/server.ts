import express from 'express';
import bodyParser from 'body-parser';
import * as http from "http";
import { Server } from 'socket.io';
import cors from 'cors';
import axios from "axios";
import 'dotenv/config'

const APP_LISTEN_PORT =4000;
const CHAT_ENDPOINT = process.env.NEURAL_PIPELINE_CHAT_ENDPOINT ?? 'localhost:4002';
const BASE_APP = process.env.SERVER_BASE_APP ?? `http://localhost:${APP_LISTEN_PORT}`;

const app = express();
const corsOpts = {
  origin: '*'
};

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOpts,
});

io
  .on('connection', (socket) => {
    console.log('Socket: incoming connection', socket.id);
    socket
      .on("disconnect", () => console.log("Client disconnected"))
      .on('user-entered-prompt', async ({ userPromt: prompt }) => {
        console.log('New prompt has been received from user', {prompt, socketId: socket.id});
        try {
          await axios.post(
            CHAT_ENDPOINT,
            {
              prompt,
              callback: `${BASE_APP}/callback/${socket.id}`,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          socket.emit('user-entered-prompt-accepted');
        } catch (error) {
          console.error(
            'Error happened while sending char prompt',
            { error },
          );
          socket.emit('user-entered-prompt-failed');
        }
      });
  })

app.post('/callback/:uid', (req, res, next) => {
  const { uid } = req.params;
  const { prompt } = req?.body ?? {};
  res.sendStatus(200);

  // @ts-ignore
  const socket = io.sockets.sockets.get(uid);
  if (!socket) {
    return console.error('No socket can be found by id', {uid});
  }

  socket.emit('summary-response-received', { summary: prompt });
})

server.listen(APP_LISTEN_PORT, () => {
  console.log(`App is started on port: ${APP_LISTEN_PORT}`);
});