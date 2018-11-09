import { expect } from "code";
import * as Lab from "lab";

const lab = Lab.script();
const { it, describe } = lab;
export { lab };

import { extractTitle } from "../lib/reading";

describe("extract title", () => {
  describe("there are at least a title", () => {
    it("returns the first title", () => {
      const title = extractTitle("test/fixtures/example1/file1.md");

      expect(title).to.equal("Example 1 - File 1");
    });
  });

  describe("there are at least a title", () => {
    it("returns null", () => {
      const title = extractTitle("test/fixtures/empty.md");

      expect(title).to.be.null();
    });
  });
});
