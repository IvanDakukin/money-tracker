const express = require("express");
const path = require("path");
const config = require('./config');
const cors = require('cors');

const app = express();
app.use(express.json({ extended: true }));
app.use(cors());

app.use("/api/transactions", require("./routes/transaction.routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
