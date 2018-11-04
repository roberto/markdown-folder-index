const fs = require("fs");
const util = require("util");
const matched = require("matched");
const { dirname, join } = require("path");

const listSiblings = async file => {
  const folder = dirname(file);

  return matched(join(folder, "*.md"), { ignore: file });
};

module.exports = listSiblings;
