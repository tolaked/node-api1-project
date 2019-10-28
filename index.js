// implement your API here
const express = require("express");

const cors = require("cors");
const database = require("./data/db");
const app = express();

app.use(cors());
app.use(express.json());

function newUser(req, res) {
  const name = req.body;
  database
    .insert(name)
    .then(user => {
      res.status(200).json({
        success: true,
        user: { id: user.id, name: name.name }
      });
      console.log(user);
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        err
      })
    );
}

function getUsers(req, res) {
  database
    .find()
    .then(users => {
      res.status(200).json({
        success: true,
        users
      });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        err
      })
    );
}

function getUserById(req, res) {
  const id = req.params.id;
  database
    .findById(id)
    .then(user => {
      res.status(200).json({
        success: true,
        user
      });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        err
      })
    );
}

function deleteUser(req, res) {
  const id = req.params.id;
  database
    .remove(id)
    .then(user => {
      if (user) {
        res.status(204).json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
}

function updateUser(req, res) {
  const id = req.params.id;
  const change = req.body;

  database
    .update(id, change)
    .then(updated => {
      if (updated) {
        res.status(200).json({
          success: true,
          message: "User info updated successfully",
          updated
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User  not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
}

app.post("/api/users", newUser);
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser);

app.get("*", (req, res) => {
  res.send("Hello there");
});

app.listen(8000, () => console.log("API running on port 8000"));
