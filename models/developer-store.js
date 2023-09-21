'use strict';

const developerStore = {

  developers: require('./developer-store.json').developers,

  getAllDevelopers() {
    return this.developers;
  },

};

module.exports = developerStore;