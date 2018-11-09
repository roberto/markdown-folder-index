import * as Lab from "lab";
import { expect } from "code";

const lab = Lab.script();
const { it, describe } = lab;
export { lab };

import { formatIndex } from "../lib/writing";

describe("format index", () => {
  it("returns a formatted string of the index", () => {
    const content = formatIndex([
      { title: "Example 1", file: "example/file1.md" },
      { title: "Example 2", file: "example/file2.md" }
    ]);

    expect(content).to.equal(
      "* [Example 1](example/file1.md)\n* [Example 2](example/file2.md)"
    );
  });
});
