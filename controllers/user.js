const UserModel = require("../models/user");
const ArticleModel = require("../models/article");
var ObjectId = require("mongodb").ObjectID;

function createUser(req, res) {
  const user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  user.save();
  res.send(user);
}

function updateUser(req, res) {
  const userId = req.params.userId;
  const userInput = req.body;
  UserModel.findOneAndUpdate(
    { _id: ObjectId(userId) },
    { $set: userInput },
    err => res.status(404).json(err)
  ).then(user => res.json(user));
}

function deleteUser(req, res) {
  const userId = req.params.userId;
  UserModel.findByIdAndRemove({ _id: ObjectId(userId) }, err => {
    if (err) {
      return res.status(404).send("Not deleted.");
    }
    res.send(`User id: ${userId} deleted`);
  });
}

function getUser(req, res) {
  const userId = req.params.userId;
  UserModel.findById({ _id: ObjectId(userId) }, (err, user) => {
    if (err) {
      return res.status(404).send("User not define.");
    }
    res.send(`User: ${user}`);
  });
}

function getUserArticles(req, res) {
  const userId = req.params.userId;

  ArticleModel.find({ owner: userId }, (err, articles) => {
    if (err) {
      return res.status(404).send("Articles not found.");
    }
    res.json(articles);
  });
}

function updateNumberOfArticles(userId, number) {
  UserModel.findOneAndUpdate(
    { _id: ObjectId(userId) },
    { $inc: { numberOfArticles: number } },
  ).then(res => console.log('user', res));
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUserArticles,
  updateNumberOfArticles
};
