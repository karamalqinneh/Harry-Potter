const http = require("http");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const pg = require("pg");
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const char = require("./mainData/data.json");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(JSON.stringify(char));
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
