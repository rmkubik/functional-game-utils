const fs = require("fs").promises;
const fg = require("fast-glob");
const path = require("path");
const jsdoc = require("jsdoc-api");

export async function getModules() {
  const srcPath = path.join(process.cwd(), "..", "src");
  const srcGlob = path.join(srcPath, "**", "*.js");
  const testFileGlob = path.join("**", "*.test.js");

  const srcFiles = await fg([srcGlob], { ignore: [testFileGlob] });

  const explanationPromises = srcFiles.map(async (file) => {
    return await jsdoc.explain({ files: file });
  });
  const explanations = (await Promise.all(explanationPromises)).flat();

  const moduleDocs = explanations.filter(
    (explanation) => explanation.kind === "module"
  );

  const blocks = explanations.filter(
    (block) =>
      !block.undocumented && block.kind !== "module" && block.kind !== "package"
  );

  const modules = moduleDocs.reduce((newModules, doc) => {
    const moduleMembers = blocks.filter(
      (block) => block.memberof === doc.longname
    );

    return {
      ...newModules,
      [doc.name.toLowerCase()]: moduleMembers,
    };
  }, {});

  return modules;
}
