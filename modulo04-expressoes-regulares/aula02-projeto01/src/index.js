const { readFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

const TextProcessorFacade = require("./TextProcessorFacade");

(async () => {
  const dataPath = join(__dirname, "../../docs/contrato.pdf");
  const buffer = await readFile(dataPath);
  const { text } = await pdf(buffer);
  console.log(TextProcessorFacade);

  const instance = new TextProcessorFacade(text);
  const person = instance.getPeopleFromPDF();

  console.log(person);
})();
