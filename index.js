require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }));
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
