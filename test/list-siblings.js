const { expect } = require("code");
const { it, describe } = (exports.lab = require("lab").script());

const listSiblings = require("../lib/list-siblings");

describe("list siblings", () => {
  it("returns a list of sibling files", async () => {
    const files = await listSiblings("test/fixtures/example1/README.md");

    expect(files).to.equal([
      "test/fixtures/example1/file1.md",
      "test/fixtures/example1/file2.md"
    ]);
  });
});
