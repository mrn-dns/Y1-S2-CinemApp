'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const playlist = require('./controllers/playlist.js');
const director = require('./controllers/developer.js');
const accounts = require ('./controllers/accounts.js');
const comment = require ('./controllers/comment.js')

// connect routes to controllers
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/director', director.index);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/comment', comment.index)
router.get('/playlist/:id', playlist.index);

router.get('/playlist/:id', playlist.index);

router.get('/playlist/:id/deletemovie/:movieid', playlist.deleteMovie);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);

router.post('/playlist/:id/addmovie', playlist.addMovie);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.post('/playlist/:id/updatemovie/:movieid', playlist.updateMovie);
router.post('/comment/addcomment', comment.addComment);

// export router module
module.exports = router;

