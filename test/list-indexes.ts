import * as Lab from "lab";
import { expect } from "code";

const lab = Lab.script();
const { it, describe } = lab;
export { lab };

import { listIndexes } from "../lib/reading";

describe("list indexes", () => {
  it("returns a list of index files", () => {
    const files = listIndexes("test/fixtures/");

    expect(files).to.equal([
      "test/fixtures/example1/README.md",
      "test/fixtures/example2/readme.md"
    ]);
  });
});
