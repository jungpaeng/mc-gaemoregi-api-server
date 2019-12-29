const fs = require('fs');

export const getJSONFileSystem = (file) => {
  const jsonFile = fs.readFileSync(file, 'utf8');

  return JSON.parse(jsonFile);
};