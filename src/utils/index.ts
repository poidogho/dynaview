import axios from 'axios';

const isDevelopment = window.location.hostname.includes('localhost');

const getServer = () => {
  return isDevelopment ? 'http://localhost:30080' : '';
};

const enforceHttps = () => {
  if (window.location.protocol !== 'https:' && !isDevelopment) {
    window.location.href =
      'https:' +
      window.location.href.substring(window.location.protocol.length);
  }
};

export { getServer, enforceHttps, axios, isDevelopment };
