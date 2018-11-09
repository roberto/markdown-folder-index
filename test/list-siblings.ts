import { expect } from "code";
import * as Lab from "lab";

const lab = Lab.script();
const { it, describe } = lab;
export { lab };

import { listSiblings } from "../lib/reading";

describe("list siblings", () => {
  it("returns a list of sibling files", () => {
    const files = listSiblings("test/fixtures/example1/README.md");

    expect<string[]>(files).to.equal([
      "test/fixtures/example1/file1.md",
      "test/fixtures/example1/file2.md"
    ]);
  });
});
