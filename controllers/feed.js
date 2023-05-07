const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require('../models/user')

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  try {
 const totalItems = await Post.find() .countDocuments() 
 const posts = await  Post.find() 
      .skip((currentPage - 1) * perPage)
      .limit(perPage)   

      res.status(200).json({
        massage: "fetched post successfuly",
        posts: posts,
        totalItems: totalItems
      })
    } catch (err) {
      if (!err.statusCode) {
      err.statusCode = 500;
      }        
      next(err);
   }
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, enterd data is incoreect");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No Image Provided");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  let creator
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId
  });
  post
    .save()
    .then((result) => {
    return  User.findById(req.userId)
  })
.then(user => {
      creator = user
      user.posts.push(post)
      return user.save()     
    })
    .then(result => {
      res.status(201).json({
        massage: "post crated successfully",
        post: post,
        creator: { _id: creator._id, name: creator.name} 
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could Not Find Post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        massage: "post fetched",
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putPost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, enterd data is incoreect");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("no File Picked ..//..");
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could Not Find Post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("not Authrized.");
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        cleareImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "post updated", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)

    .then((post) => {
      if (!post) {
        const error = new Error("Could Not Find Post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("not Authrized.");
        error.statusCode = 403;
        throw error;
      }
      cleareImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })

    .then((result) => {
      return  User.findById(req.userId)
    })
.then(user => {
  user.posts.pull(postId)
  return user.save()
})
.then(result => {
  res.status(200).json({ message: "Deleted post" });

})
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const cleareImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
