const { readFile } = require("fs/promises");
const { error } = require("./constants");
const User = require("./User");
const DEFAULT_OPTIONS = {
  maxLength: 3,
  validHeaders: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getContentFile(filePath);
    const validation = File.isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    return File.parseCSVToJSON(content);
  }

  static async getContentFile(filePath) {
    // const fileName = join(__dirname, filePath);
    return (await readFile(filePath)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [headers, ...linesWithoutHeaders] = csvString.split("\n");
    const isValidHeaders = headers === options.validHeaders.join(",");

    if (!isValidHeaders) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isContentLengthAccepted =
      linesWithoutHeaders.length > 0 &&
      linesWithoutHeaders.length <= options.maxLength;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(stringCsv) {
    const lines = stringCsv.split("\n");
    const firstLine = lines.shift(); // "id, name, profession, age"
    const header = firstLine.split(","); // ["id", "name", "profession", "age"]

    const users = lines.map((line) => {
      const colums = line.split(","); // ex: [123, "Alessandro", "Developer", 26]
      let user = {};
      for (const index in colums) {
        user[header[index]] = colums[index]; // ex: {id: 123, name: "Alessandro", age: 26}
      }

      return new User(user);
    });

    return users;
  }
}

module.exports = File;
