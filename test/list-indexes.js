const { expect } = require("code");
const { it, describe } = (exports.lab = require("lab").script());

const { listIndexes } = require("../lib/files");

describe("list indexes", () => {
  it("returns a list of index files", async () => {
    const files = await listIndexes("test/fixtures/");

    expect(files).to.equal([
      "test/fixtures/example1/README.md",
      "test/fixtures/example2/readme.md"
    ]);
  });
});
