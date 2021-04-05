const withImages = require('next-images');
module.exports = withImages({
  env: {
    GOOGLE_MAP_API_KEY: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    SITE_TITLE: process.env.REACT_APP_SITE_TITLE,
    APP_API: process.env.REACT_APP_API,
  },
});