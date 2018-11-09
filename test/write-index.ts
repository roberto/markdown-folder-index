import * as Lab from "lab";
import { expect } from "code";
import * as fs from "fs";

const lab = Lab.script();
const { it, describe, beforeEach, afterEach } = lab;
export { lab };

import { writeIndex } from "../lib/writing";

const TEST_FILE = "test/fixtures/writing.md";

describe("writeIndex", () => {
  describe("when folder index block is present", () => {
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

      const content = fs.readFileSync(TEST_FILE, "utf-8");

      expect(content).to.equal(
        "# H1\nText\n<!-- folder-index-start -->\n* Point 1\n* Point 2\n<!-- folder-index-end -->\nText"
      );
    });
  });

  describe("when only the key folder-index is present", () => {
    beforeEach(() => {
      fs.writeFileSync(TEST_FILE, "# H1\nText\n<!-- folder-index -->\nText");
    });

    afterEach(() => {
      fs.unlinkSync(TEST_FILE);
    });

    it("replaces index on file", () => {
      writeIndex(TEST_FILE, "* Point 1\n* Point 2");

      const content = fs.readFileSync(TEST_FILE, "utf-8");

      expect(content).to.equal(
        "# H1\nText\n<!-- folder-index-start -->\n* Point 1\n* Point 2\n<!-- folder-index-end -->\nText"
      );
    });
  });

  describe("when there is no folder-index", () => {
    beforeEach(() => {
      fs.writeFileSync(TEST_FILE, "# H1\nText\nText");
    });

    afterEach(() => {
      fs.unlinkSync(TEST_FILE);
    });

    it("replaces index on file", () => {
      writeIndex(TEST_FILE, "* Point 1\n* Point 2");

      const content = fs.readFileSync(TEST_FILE, "utf-8");

      expect(content).to.equal("# H1\nText\nText");
    });
  });
});
