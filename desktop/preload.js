// Preload script - secure bridge between renderer and main process
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('neuraldock', {
  platform: process.platform,
  version: '1.0.0'
});
