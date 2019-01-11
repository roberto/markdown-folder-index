import { expect } from "code";
import * as fs from "fs";
import * as Lab from "lab";
import * as matched from "matched";
import sinon from "sinon";
import execute from "../index";
import { filter, keys, test } from "ramda";

const lab = Lab.script();
const { it, describe, beforeEach, afterEach, after } = lab;
export { lab };

describe.only("generateFolderIndex", () => {
  const sandbox = sinon.createSandbox();
  const writeFileSync = sandbox.stub(fs, "writeFileSync");

  beforeEach(() => {
    const data = {
      "./README.md": "# Title\n<!-- folder-index -->\nContent",
      "./subject1/README.md": "# Subject 1\n<!-- folder-index -->Content",
      "./subject1/subject11.md": "# Subject 1.1\nContent",
      "./subject1/subject12.md": "# Subject 1.2\nContent",
      "./subject1/subject13/README.md": "# Subject 1.3\nContent",
      "./subject1/subject14/README.md":
        "# Subject 1.4\n<!-- folder-index-start -->\n* Wrong Title\n<!-- folder-index-end -->\nContent",
      "./subject1/subject14/correct-title.md": "# Wrong Title",
      "./subject2/README.md": "# Subject 2\nContent"
    };

    const readmes = filter(test(/README\.md/), keys(data));

    const matchedStub = sandbox.stub(matched, "sync");
    matchedStub.withArgs("**/README.md", { nocase: true }).returns(readmes);
    matchedStub
      .withArgs("./subjet1/README.md")
      .returns(filter(test(/subject1\/[a-z]+\.md/), keys(data)));

    sandbox.stub(fs, "readFileSync").callsFake(file => data[file]);
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it("writes subject 1 and subject 2 README content into README root", () => {
    execute();
    console.log("calls", writeFileSync.calls);
    sinon.assert.calledWith(writeFileSync, "./README.md", "Blah");
  });
});
