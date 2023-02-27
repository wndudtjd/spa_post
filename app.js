const express = require('express');
const app = express();
const port = 3000;

// const postsRouter=require("./routes/posts.js");
const globalRouter = require("./routes/index")

const connect = require("./schemas/index.js")
connect();

app.use(express.json());
app.use("/api", [globalRouter]);
// app.use("/api",[postsRouter]);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});