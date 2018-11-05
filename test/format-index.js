const { expect } = require("code");
const { it, describe } = (exports.lab = require("lab").script());

const { formatIndex } = require("../lib/files");

describe("format index", () => {
  it("returns a formatted string of the index", async () => {
    const content = formatIndex([
      { title: "Example 1", file: "example/file1.md" },
      { title: "Example 2", file: "example/file2.md" }
    ]);

    expect(content).to.equal(
      "* [Example 1](example/file1.md)\n* [Example 2](example/file2.md)"
    );
  });
});
