import fs from "fs";
import matched from "matched";
import path from "path";
import { filter, join, map, pipe } from "ramda";

const REGEX_TOKEN = /^\<!-- folder-index(-start)? --\>$/m;

export const listIndexes = (folder: string): string[] => {
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

  return search ? search[1] : null
};
