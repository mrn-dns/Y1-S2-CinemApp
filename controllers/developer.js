'use strict';

// import all required modules
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const accounts = require ('./accounts.js');
const uuid = require("uuid");

// create developer object
const developer = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('developer rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    if(loggedInUser) {
      
      const viewData = {
      title: 'About the Playlist App',
      developers: developerStore.getAllDevelopers(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture:loggedInUser.picture
        
    };
    
    // render the about view and pass through the data
    response.render('director', viewData);
      
    } else response.redirect('/');
  },
};

// export the developer module
module.exports = developer;