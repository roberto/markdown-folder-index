import { listIndexes, extractTitle, listSiblings } from "./lib/reading";
import { formatIndex, writeIndex } from "./lib/writing";
import { pipe, objOf, forEach, map, chain, converge, merge } from "ramda";

const createData = pipe(
  listSiblings,
  chain(
    converge(merge, [
      objOf("file"),
      pipe(
        extractTitle,
        objOf("title")
      )
    ])
  )
);

interface IndexData {
  files: {
    file: string;
    title: string;
  }[];
  index: string;
}

const execute = () => {
  return pipe(
    map(
      converge(merge, [
        objOf("index"),
        pipe(
          createData,
          objOf("files")
        )
      ])
    ),
    forEach(({ index, files }: IndexData) =>
      writeIndex(index, formatIndex(files))
    )
  )(listIndexes("."));
};

export default execute;
