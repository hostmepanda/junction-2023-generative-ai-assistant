import express from 'express';
import bodyParser from 'body-parser';
import * as http from "http";
import cors from 'cors';
import axios from "axios";
import 'dotenv/config'

const APP_LISTEN_PORT = 4500;
const GOOGLE_SE_ID = process.env.GOOGLE_CSE_ID ?? 'no-id'
const GOOGLE_KEY = process.env.GOOGLE_CSE_API_KEY ?? 'no-api-key'

const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

app.post('/search', async (req, res, next) => {
  const { query } = req?.body ?? {};

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/customsearch/v1?cx=${GOOGLE_SE_ID}&key=${GOOGLE_KEY}&q=${query}`,
      {
        headers: { Accept: 'application/json' },
      }
    );

    const { items } = data;
    // @ts-ignore
    const links = items.map(({ link }) => link);
    console.log(links)
    return res.json(links)
  } catch (error) {
    console.error(error)
  }

  res.sendStatus(200)
})

server.listen(APP_LISTEN_PORT, () => {
  console.log(`App is started on port: ${APP_LISTEN_PORT}`);
});