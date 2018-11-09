const { expect } = require("code");
const { it, describe } = (exports.lab = require("lab").script());

const { extractTitle } = require("../lib/reading");

describe("extract title", () => {
  it("returns the first title", () => {
    const title = extractTitle("test/fixtures/example1/file1.md");

    expect(title).to.equal("Example 1 - File 1");
  });
});
