import fs from "fs";
import { join, map, pipe, tap } from "ramda";

interface FileData {
  file: string;
  title: string;
}

export const formatIndex = pipe(
  map(({ title, file }: FileData) => `* [${title}](${file})`),
  join("\n")
);

export const writeIndex = (file: string, indexContent: string) => {
  const currentContent = fs.readFileSync(file, "utf-8");

  const newContent = currentContent.replace(
    /(<!-- folder-index-start -->\n.*\n<!-- folder-index-end -->|<!-- folder-index -->)/gm,
    indexTemplate(indexContent)
  );

  fs.writeFileSync(file, newContent);
};

const indexTemplate = (content: string) =>
  `<!-- folder-index-start -->\n${content}\n<!-- folder-index-end -->`;
