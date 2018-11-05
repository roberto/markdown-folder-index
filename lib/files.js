const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const matched = require("matched");
const path = require("path");
const { pipe, filter, join, map } = require("ramda");

const REGEX_TOKEN = /^\<!-- folder-index(-start)? --\>$/m;

const listIndexes = folder => {
  const files = matched.sync(path.join(folder, "**/README.md"), {
    nocase: true
  });

  return filter(file => {
    const data = fs.readFileSync(file, "utf-8");
    return REGEX_TOKEN.test(data);
  }, files);
};

const listSiblings = file => {
  const folder = path.dirname(file);

  return matched.sync(path.join(folder, "*.md"), { ignore: file });
};

const REGEX_HEADING = /^# (.*)$/m;

const extractTitle = file => {
  const data = fs.readFileSync(file, "utf-8");
  const search = data.match(REGEX_HEADING);
  const title = search[1];

  return title;
};

const formatIndex = pipe(
  map(({ title, file }) => `* [${title}](${file})`),
  join("\n")
);

module.exports = {
  listIndexes,
  extractTitle,
  listSiblings,
  formatIndex
};
