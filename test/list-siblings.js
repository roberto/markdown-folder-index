const { expect } = require("code");
const { it, describe } = (exports.lab = require("lab").script());

const { listSiblings } = require("../lib/reading");

describe("list siblings", () => {
  it("returns a list of sibling files", () => {
    const files = listSiblings("test/fixtures/example1/README.md");

    expect(files).to.equal([
      "test/fixtures/example1/file1.md",
      "test/fixtures/example1/file2.md"
    ]);
  });
});
