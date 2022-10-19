// get_new_postform, publish_new_post, get_single_post, ...
const { Post } = require("./../model/post.js");

const get_new_postform = (req, res) => {
  res.render("./../view/newpost.ejs");
};
const post_new = async (req, res) => {
  // save data to the database
  try {
    const post = new Post(req.body);
    result = await post.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
// request post
const request_post = (req, res) => {
  res.render(__dirname + "/../view/posts.ejs", { post: Post });
};

// querry dB using post ID
const queryby_ID = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.render(__dirname + "/../view/posts.ejs", { post: result });
    })
    .catch((error) => {
      console.log(id);
      console.log(error);
    });
};

// get post for update
const get_4_update = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((result) => {
      res.render(__dirname + "/../view/updatepost.ejs", { post: result });
    })
    .catch((err) => {
      console.log(err);
    });
};
// post updating
const post_update = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.redirect("/");
      //console.log(result)
      console.log(req.body);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Delete
const deletePost = (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        status: true,
        message: "Message Deleted Successfully",
        redirect: "/",
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: false,
        error: "Something went wrong",
        full_error: error,
      });
    });
};

module.exports = {
  get_new_postform,
  post_new,
  request_post,
  queryby_ID,
  get_4_update,
  post_update,
  deletePost,
};
