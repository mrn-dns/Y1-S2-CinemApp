'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const playlistStore = {

  store: new JsonStore('./models/playlist-store.json', { playlistCollection: [] }),
  collection: 'playlistCollection',
  
  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  getPlaylist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addPlaylist(playlist, response) {
   playlist.picture.mv('tempimage', err => {
       if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            playlist.picture = result.url;
            response();
          });
       }
   });
   this.store.add(this.collection, playlist);
  },

  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
  },

  removeAllPlaylists() {
    this.store.removeAll(this.collection);
  },

  addMovie(id, movie) {
    const playlist = this.getPlaylist(id);
    logger.debug(movie);
    playlist.movies.push(movie);
  },
  removeMovie(id, movieId) {
    const playlist = this.getPlaylist(id);
    const movies = playlist.movies;
    _.remove(movies, { id: movieId });
  },
  editMovie(id, movieId, updatedMovie) {
    const playlist = this.getPlaylist(id);
    const movies = playlist.movies;
    const index = movies.findIndex(movie => movie.id === movieId);
    movies[index].title = updatedMovie.title;
    movies[index].director = updatedMovie.director;
    movies[index].genre = updatedMovie.genre;
    movies[index].duration = updatedMovie.duration;
  },
  getUserPlaylists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};
module.exports = playlistStore;