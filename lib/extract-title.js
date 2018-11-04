const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const REGEX_HEADING = /^# (.*)$/m

const extractTitle = async file => {
  const data = await readFile(file, 'utf-8');
  const search = data.match(REGEX_HEADING);
  const title = search[1];

  return title;
};

module.exports = extractTitle;
