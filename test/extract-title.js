const { expect } = require("code");
const { it, describe } = (exports.lab = require("lab").script());

const { extractTitle } = require("../lib/files");

describe("extract title", () => {
  it("returns the first title", async () => {
    const title = await extractTitle("test/fixtures/simple.md");

    expect(title).to.equal("Hello World!");
  });
});
