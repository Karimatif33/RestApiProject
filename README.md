## Dashboard Directory Documentation

The Dashboard directory contains the server-side code for a social media application. It includes the following files:
Files
## app.js

This file sets up the server and defines middleware functions for handling requests. It includes the following middleware functions:

    cors: This middleware function sets headers to allow cross-origin requests.
    bodyParser: This middleware function parses incoming request bodies.
    multer: This middleware function handles file uploads.
    graphqlHTTP: This middleware function handles GraphQL requests.

## auth.js

This file contains functions for handling user authentication. It includes the following functions:

    signup: This function creates a new user account.
    login: This function logs in a user and returns a JSON Web Token.
    getUserStatus: This function gets the status of a logged-in user.
    updateUserStatus: This function updates the status of a logged-in user.

## feed.js

This file contains functions for handling posts and comments. It includes the following functions:

    getPosts: This function gets a list of posts.
    createPost: This function creates a new post.
    getPost: This function gets a single post.
    putPost: This function updates a post.
    deletePost: This function deletes a post.
    createComment: This function creates a new comment.
    updateComment: This function updates a comment.
    deleteComment: This function deletes a comment.

## resolvers.js

This file contains GraphQL resolver functions for handling queries and mutations. It includes the following resolver functions:

    login: This resolver function logs in a user and returns a JSON Web Token.
    createUser: This resolver function creates a new user account.
    user: This resolver function gets the details of a logged-in user.
    updateStatus: This resolver function updates the status of a logged-in user.
    posts: This resolver function gets a list of posts.
    createPost: This resolver function creates a new post.
    post: This resolver function gets a single post.
    updatePost: This resolver function updates a post.
    deletePost: This resolver function deletes a post.
    createComment: This resolver function creates a new comment.
    updateComment: This resolver function updates a comment.
    deleteComment: This resolver function deletes a comment.

## Models

The models directory contains Mongoose models for the application's data. It includes the following models:

    user.js: This model defines the schema for user accounts.
    post.js: This model defines the schema for posts.
    comment.js: This model defines the schema for comments.

Overall, the Dashboard directory contains the server-side code for a social media application, including functions for handling user authentication, posts, and comments.
