const fs = require("fs");
const matched = require("matched");
const path = require("path");
const { pipe, filter, join, map } = require("ramda");

const REGEX_TOKEN = /^\<!-- folder-index(-start)? --\>$/m;

export const listIndexes = (folder: string) => {
  const files = matched.sync(path.join(folder, "**/README.md"), {
    nocase: true
  });

  return filter((file: string) => {
    const data = fs.readFileSync(file, "utf-8");
    return REGEX_TOKEN.test(data);
  }, files);
};

export const listSiblings = (file: string) => {
  const folder = path.dirname(file);

  return matched.sync(path.join(folder, "*.md"), { ignore: file });
};

const REGEX_HEADING = /^# (.*)$/m;

export const extractTitle = (file: string) => {
  const data = fs.readFileSync(file, "utf-8");
  const search = data.match(REGEX_HEADING);
  const title = search[1];

  return title;
};
