const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['components'] = path.join(__dirname, 'src', 'components');
    config.resolve.alias['pages'] = path.join(__dirname, 'pages');
    config.resolve.alias['services'] = path.join(__dirname, 'services');
    config.resolve.alias['utils'] = path.join(__dirname, 'utils');
    config.resolve.alias['config'] = path.join(__dirname, 'config');
    config.resolve.alias['images'] = path.join(__dirname, 'public', 'images');
    return config;
  },
};
