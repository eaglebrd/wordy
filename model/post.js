const { Schema, default: mongoose } = require("mongoose");

const postschema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postschema);
module.exports = { Post };
