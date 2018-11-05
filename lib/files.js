const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const matched = require("matched");
const { dirname, join } = require("path");

const REGEX_TOKEN = /^\<!-- folder-index(-start)? --\>$/m;

const listIndexes = async folder => {
  const files = await matched(join(folder, "**/README.md"), { nocase: true });

  return files.filter(file => {
    const data = fs.readFileSync(file, "utf-8");
    return REGEX_TOKEN.test(data);
  });
};

const listSiblings = async file => {
  const folder = dirname(file);

  return matched(join(folder, "*.md"), { ignore: file });
};

const REGEX_HEADING = /^# (.*)$/m;

const extractTitle = async file => {
  const data = await readFile(file, "utf-8");
  const search = data.match(REGEX_HEADING);
  const title = search[1];

  return title;
};

module.exports = {
  listIndexes,
  extractTitle,
  listSiblings
};
