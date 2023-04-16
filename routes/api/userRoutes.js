const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// http://localhost:3001/api/users
router.route("/").get(getUsers).post(addUser);

// http://localhost:3001/api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// http://localhost:3001/api/users/:userId/friends
router.route("/:userId/friends").post(addFriend);

// http://localhost:3001/api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
