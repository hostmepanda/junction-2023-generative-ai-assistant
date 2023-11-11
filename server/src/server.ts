import express from 'express';

const APP_LISTEN_PORT = 5000

const app = express();

app.listen(APP_LISTEN_PORT, () => {
  console.log(`App is started on port: ${APP_LISTEN_PORT}`)
})