'use strict';

// import all required modules
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('start rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    
    // app statistics calculations
    if(loggedInUser) {
      
      const playlists = playlistStore.getAllPlaylists();
      const userPlaylists = playlistStore.getUserPlaylists(loggedInUser.id);
      
      let userNumPlaylists = userPlaylists.length;
      let userNumMovies = 0;
      
      let numPlaylists = playlists.length;
      let numMovies = 0;
      
      let avgMovies = 0;
      let userAvgMovies = 0;
      
      for (let item of playlists) {
        numMovies += item.movies.length;
      }
      
      for (let item of userPlaylists) {
        userNumMovies += item.movies.length;
      }
      
      if(numMovies>0)
        avgMovies = numMovies/numPlaylists;
      if(userNumMovies>0)
        userAvgMovies = userNumMovies/userNumPlaylists;
      
      let biggestPlaylist = playlists[0];
      for(let i=1; i<numPlaylists; i++) {
        if(playlists[i].movies.length>biggestPlaylist.movies.length)
          biggestPlaylist = playlists[i];
      }
      
      let smallestPlaylist = playlists[0];
      for(let i=1; i<numPlaylists; i++) {
        if(playlists[i].movies.length<smallestPlaylist.movies.length)
          smallestPlaylist = playlists[i];
      }
      
      let userBiggestPlaylist = userPlaylists[0];
      for(let i=1; i<userNumPlaylists; i++) {
        if(userPlaylists[i].movies.length>userBiggestPlaylist.movies.length)
          userBiggestPlaylist = userPlaylists[i];
      }
      
      let userSmallestPlaylist = userPlaylists[0];
      for(let i=1; i<userNumPlaylists; i++) {
        if(userPlaylists[i].movies.length<userSmallestPlaylist.movies.length)
          userSmallestPlaylist = userPlaylists[i];
      }
      
      if(numPlaylists>0) {
        biggestPlaylist = biggestPlaylist.title;
        smallestPlaylist = smallestPlaylist.title;
      } else {
        biggestPlaylist = "NO PLAYLISTS ADDED.";
        smallestPlaylist = "NO PLAYLISTS ADDED.";
      }
      
      if(userNumPlaylists>0) {
        userBiggestPlaylist = userBiggestPlaylist.title;
        userSmallestPlaylist = userSmallestPlaylist.title;
      } else {
        userBiggestPlaylist = "NO PLAYLISTS ADDED.";
        userSmallestPlaylist= "NO PLAYLISTS ADDED.";
      }
      
      
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the Playlist App!',
      totalPlaylists: numPlaylists,
      totalMovies: numMovies,
      biggestPlaylist: biggestPlaylist,
      smallestPlaylist: smallestPlaylist,
      avgMovies: avgMovies,
      userTotalPlaylists: userNumPlaylists,
      userTotalMovies: userNumMovies,
      userBiggestPlaylist: userBiggestPlaylist,
      userSmallestPlaylist: userSmallestPlaylist,
      userAvgMovies: userAvgMovies,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture:loggedInUser.picture
    };
    
    // render the start view and pass through the data
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;