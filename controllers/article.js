const ArticleModel = require("../models/article");
const UserleModel = require("../models/user");
const { updateNumberOfArticles } = require("./user");
var ObjectId = require("mongodb").ObjectID;

function createArticle(req, res) {
  const newArticle = req.body;
  UserleModel.findById({ _id: ObjectId(req.body.owner) }, (err, owner) => {
    if (err) return console.log('There is no such author: ', err)
    if (owner) {
      console.log('111111111111111111', 111111111111111111)
      const article = new ArticleModel(newArticle);
      article.save();
      updateNumberOfArticles(newArticle.owner, 1);
      res.json(article);
    }
  });
}

function updateArticle(req, res) {
  const articleId = req.params.id;
  const articleInput = req.body;
  ArticleModel.findOneAndUpdate(
    { _id: ObjectId(articleId) },
    {
      $set: articleInput
    },
    {},
    err => {
      if (err) {
        res.status(404).send(err);
      }
    }
  ).then(article => res.json(article));
}

function deleteArticle(req, res) {
  const articleId = req.params.id;

  ArticleModel.findOneAndRemove(
    { _id: ObjectId(articleId) },
    (err, article) => {
      if (err) {
        return res.status(404).send("Not deleted.");
      }
      if (article.owner) {
        updateNumberOfArticles(article.owner, -1);
      }
      res.send(`Article id: ${articleId} deleted`);
    }
  );
}

function getArticle(req, res) {
  ArticleModel.find(req.query)
    .populate("owner")
    .exec((err, foundArticles) => {
      if (err) {
        res.send(err);
      }
      res.json(foundArticles);
    });
}

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticle
};
