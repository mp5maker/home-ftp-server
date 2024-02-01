const express = require("express");
const path = require("node:path");
const { exec } = require("child_process");
const fs = require("node:fs");

const app = express();
const PORT = 4012;

app.use('/', express.static(path.join(__dirname, 'static')))

/**
 * Regular Server
 */
const server = app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
  exec('ifconfig | grep -E "inet 192"', (error, stdout, stderr) => {
    console.log(stdout);
    fs.writeFile(path.join(__dirname, "static/host.txt"), stdout, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
});

// Kill Server
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Express server is closed");
  });
});
