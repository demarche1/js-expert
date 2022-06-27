const safeRegex = require("safe-regex");

class InvalidRegexError extends Error {
  constructor(exp) {
    super(`This ${exp} is unsafe dude!`);
    this.name = "InvalidRegexError";
  }
}

const evaluateRegex = (exp) => {
  if (!safeRegex(exp)) throw new InvalidRegexError(exp);

  return exp;
};

module.exports = { evaluateRegex, InvalidRegexError };
