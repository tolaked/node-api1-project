// implement your API here
const express = require("express");

const cors = require("cors");
const database = require("./data/db");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", newUser);

function newUser(req, res) {
  const name = req.body;
  database
    .insert(name)
    .then(user => {
      res.status(200).json({ success: true, user });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        err
      })
    );
}
app.get("*", (req, res) => {
  res.send("Hello there");
});

app.listen(8000, () => console.log("API running on port 8000"));
