'use strict';

// import all required modules
const logger = require('../utils/logger');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const commentStore = require('../models/comment-store.js');

// create comment object
const comment = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'CinemApp',
      comments: commentStore.getAllComments(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture:loggedInUser.picture,
    };
      logger.info('about to render' + viewData.comments);
      response.render('comment', viewData);
    } else response.redirect('/'); 
  },
  
  deleteComment(request, response) {
    const commentId = request.params.id;
    logger.debug(`Deleting Comment ${commentId}`);
    commentStore.removeComment(commentId);
    response.redirect('/comment');
  },
  
  addComment(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture:loggedInUser.picture,
      fullName: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      message: request.body.comment,
      date: date,
    };
    logger.debug("Creating a new Comment" + newComment);
    commentStore.addComment(newComment, function() {
      response.redirect('/comment');
    });
  },
};

// export the comment module
module.exports = comment;