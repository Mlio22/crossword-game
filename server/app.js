const express = require("express");
const router = require("./routers");
const app = express();

app.use(router);

const port = 3000;
app.listen(3000, () => {
  console.log(`crossword-game app listening on http://localhost:${port}`);
});
