'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const playlistStore = require('../models/playlist-store');
const accounts = require ('./accounts.js');

const playlist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const playlistId = request.params.id;
    logger.debug('Playlist id = ' + playlistId);
    if (loggedInUser) {
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture:loggedInUser.picture
    };
    response.render('playlist', viewData);
    }
    else response.redirect('/');
  },
    deleteMovie(request, response) {
    const playlistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug(`Deleting Movie ${movieId} from Playlist ${playlistId}`);
    playlistStore.removeMovie(playlistId, movieId);
    response.redirect('/playlist/' + playlistId);
  },
  addMovie(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newMovie = {
      id: uuid(),
      title: request.body.title,
      director: request.body.director,
      genre: request.body.genre,
      duration: request.body.duration + " minutes"
    };
    logger.debug(`adding movie ${newMovie} to Playlist ${playlistId}`);
    playlistStore.addMovie(playlistId, newMovie);
    response.redirect('/playlist/' + playlistId);
  },
  updateMovie(request, response) {
    const playlistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("updating movie " + movieId);
    const updatedMovie = {
      title: request.body.title,
      director: request.body.director,
      genre: request.body.genre,
      duration: request.body.duration
    };
    playlistStore.editMovie(playlistId, movieId, updatedMovie);
    response.redirect('/playlist/' + playlistId);
  }
};

module.exports = playlist;