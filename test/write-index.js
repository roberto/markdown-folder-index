const fs = require("fs");
const { expect } = require("code");
const {
  it,
  describe,
  beforeEach,
  afterEach
} = (exports.lab = require("lab").script());

const { writeIndex } = require("../lib/writing");

const TEST_FILE = 'test/fixtures/writing.md'

describe("writeIndex", () => {
  beforeEach(() => {
    fs.writeFileSync(
      TEST_FILE,
      "# H1\nText\n<!-- folder-index-start -->\n* Old Point\n<!-- folder-index-end -->\nText"
    );
  });

  afterEach(() => {
    fs.unlinkSync(TEST_FILE);
  });

  it("replaces index on file", () => {
    writeIndex(TEST_FILE, "* Point 1\n* Point 2");

    const content = fs.readFileSync(TEST_FILE, 'utf-8')

    expect(content).to.equal(
      "# H1\nText\n<!-- folder-index-start -->\n* Point 1\n* Point 2\n<!-- folder-index-end -->\nText"
    );
  });
});
