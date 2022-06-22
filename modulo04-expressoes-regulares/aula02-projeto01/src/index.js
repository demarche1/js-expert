const { readFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

(async () => {
  const dataPath = join(__dirname, "../../docs/contrato.pdf");
  const buffer = await readFile(dataPath);
  const { text } = await pdf(buffer);

  console.log(text);
})();
