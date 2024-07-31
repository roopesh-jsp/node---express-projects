const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Acess-Control-Allow-Methods", "get,post,delete,put,patch");
  next();
});

app.get("/posts", (req, res) => {
  res.json([
    {
      title: "haii",
    },
  ]);
});
app.listen(8080);
