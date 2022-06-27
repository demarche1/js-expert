const { expect } = require("chai");
const { describe, it } = require("mocha");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("util", () => {
  it("#evaluateRegex shuold throw InvalidRegexError for unsafe regex", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+s\?+)+$/;
    /*
        // fica rodando em loop e quebra tudo!
        catastrophic backtracking!
        time \
        node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
        */
    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe dude!`
    );
  });

  it("#evaluateRegex should return valid regex", () => {
    const validRegex = /^([a-z])$/;

    expect(() => evaluateRegex(validRegex)).to.not.throw();
    expect(evaluateRegex(validRegex)).to.deep.equal(validRegex);
  });
});
