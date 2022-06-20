"use strict";
"use stric";
const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const CarService = require("../../src/services/carService");
const Transaction = require("../../src/entities/transaction");
const mocks = {
  validCar: require("../mocks/valid-car.json"),
  validCategory: require("../mocks/valid-category.json"),
  validCustumer: require("../mocks/valid-custumer.json"),
};

describe("Car Services Suite Tests", () => {
  let carService = {};
  let sandbox = {};
  before(() => {
    carService = new CarService({ cars: {} });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should retrive a random position of array", () => {
    const list = [1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(list);

    expect(result).to.be.lte(list.length).and.be.gte(0);
  });

  it("Should retrieve first id from cartIds in carCategory", () => {
    const carCategory = mocks.validCategory;
    const carPosition = 0;
    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carPosition);

    const result = carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carPosition];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("Given a car category should return an random available car", async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCategory);

    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carsRepository, carService.carsRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carsRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });

  it("Given a carCategory, custumer and numberOfDays it shuld calculate final amount in real", () => {
    const custumer = Object.create(mocks.validCustumer);
    const carCategory = Object.create(mocks.validCategory);

    custumer.age = 50;
    carCategory.price = 37.6;
    const numberOfDays = 5;

    // Testes não devem depender de classes ou serviços externos
    sandbox
      .stub(carService, "taxBasedOnAge")
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    // age: 50, tax: 1.3, categoryPrice: 37.6
    // 37.6 * 1.3 * 5 = 244.4
    const expected = carService.currentFormat.format(244.4);
    const result = carService.calculateFinalPrice({
      custumer,
      carCategory,
      numberOfDays,
    });

    expect(result).to.be.deep.equal(expected);
  });

  it("Given a custumer and carCategory it should return the transaction receipt", async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCategory,
      price: 37.6,
      carIds: [car.id],
    };
    const custumer = Object.create(mocks.validCustumer);
    custumer.age = 20;

    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2020";

    const now = new Date(2020, 10, 5);
    sandbox.useFakeTimers(now.getTime());
    sandbox
      .stub(carService.carsRepository, carService.carsRepository.find.name)
      .resolves(car);

    // age: 20, tax: 1.1, price: 37.6
    // 37.6 * 1.1 * 5 = 206.80
    const expectedAmount = carService.currentFormat.format(206.8);
    const result = await carService.rent({
      custumer,
      carCategory,
      numberOfDays,
    });
    const expected = new Transaction({
      custumer,
      car,
      finalPrice: expectedAmount,
      dueDate,
    });

    expect(result).to.be.deep.equal(expected);
  });
});
