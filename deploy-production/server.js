const express = require("express");
const path = require("path");
const app = express();
const port = 3000

app
  .get("/", (req, res) => {
    const pathFile = path.join(__dirname, "index.html")
    res.sendFile(pathFile)
  })
  .use("/assets", express.static(path.join(__dirname, "assets")))
  .get("/*path", (req, res) => {
    const pathFile = path.join(__dirname, "index.html")
    res.sendFile(pathFile)
  })
  .listen(port, () => { console.log(`Ledger App was start frontend at http://localhost:${port}`) })

