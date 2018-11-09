const fs = require("fs");
const { tap, pipe, join, map } = require("ramda");

const formatIndex = pipe(
  map(({ title, file }) => `* [${title}](${file})`),
  join("\n")
);

const writeIndex = (file, indexContent) => {
  const currentContent = fs.readFileSync(file, "utf-8");

  const newContent = currentContent.replace(
    /(<!-- folder-index-start -->\n.*\n<!-- folder-index-end -->|<!-- folder-index -->)/gm,
    indexTemplate(indexContent)
  );

  fs.writeFileSync(file, newContent);
};

const indexTemplate = content =>
  `<!-- folder-index-start -->\n${content}\n<!-- folder-index-end -->`;

module.exports = {
  formatIndex,
  writeIndex
};
