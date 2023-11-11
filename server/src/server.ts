import express from 'express';

const APP_LISTEN_PORT =4000

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(APP_LISTEN_PORT, () => {
  console.log(`App is started on port: ${APP_LISTEN_PORT}`)
})