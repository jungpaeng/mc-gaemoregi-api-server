const fs = require('fs');

const getJSONFileSystem = (file) => {
  const jsonFile = fs.readFileSync(file, 'utf8');

  return JSON.parse(jsonFile);
};

module.exports = {
  getJSONFileSystem,
};