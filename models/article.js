const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {type: String, minlength: 5, maxlength: 400, required: true, index: true},
  subtitle: {type: String, minength: 5, required: false},
  // description: {type: String, minength: 5, maxlength: 5000, required: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  category: {type: String, enum: ["sport", "games", "history"] },
  createdAt: {type: Date, default: Date.now() },
  updatedAt: {type: Date, default: Date.now() }
});

module.exports = mongoose.model('Article', ArticleSchema);
