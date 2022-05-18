const sinon = require("sinon");
const { deepStrictEqual } = require("assert");
const Fibonnaci = require("./fibonacci");

(async () => {
  {
    const fibonacci = new Fibonnaci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const expectedExecuteCount = 4;
    // Generators retornam iteratiors. (.next())
    // Existem 3 formas de ler os dados
    // Usando a função .next(), for of e rest/spread
    ((...fib) => {})(...fibonacci.execute(3));

    deepStrictEqual(spy.callCount, expectedExecuteCount);
  }

  {
    const fibonacci = new Fibonnaci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...result] = fibonacci.execute(5);
    // [0] input: 5, current: 0, next: 1
    // [1] input: 4, current: 1, next: 1
    // [2] input: 3, current: 1, next: 2
    // [3] input: 2, current: 2, next: 3
    // [4] input: 1, current: 3, next: 5
    // [5] input: 0 -> PARA
    const { args } = spy.getCall(2);
    const expectedArgs = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });
    const expectedResult = [0, 1, 1, 2, 3];

    deepStrictEqual(args, expectedArgs);
    deepStrictEqual(result, expectedResult);
  }
})();
