import * as Lab from "lab";
import { expect } from "code";

const lab = Lab.script();
const { it, describe } = lab;
export { lab };

import { extractTitle } from "../lib/reading";

describe("extract title", () => {
  it("returns the first title", () => {
    const title = extractTitle("test/fixtures/example1/file1.md");

    expect(title).to.equal("Example 1 - File 1");
  });
});
