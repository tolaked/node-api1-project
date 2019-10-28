const database = require("./db");

module.exports = {
  newUser,
  updateUser,
  getUserById,
  getUsers,
  deleteUser
};

function newUser(req, res) {
  const name = req.body;
  database
    .insert(name)
    .then(user => {
      res.status(200).json({
        success: true,
        user: { id: user.id, name: name.name }
      });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user to the database"
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
        error: "The user info cannot be retrieved"
      })
    );
}

function getUserById(req, res) {
  const id = req.params.id;
  database
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The user with the id ${id} can not be found`
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false
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
