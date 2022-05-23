const { describe, it, before } = require("mocha");

const { expect } = require("chai");
const sinon = require("sinon");

const CarService = require("../../src/services/carService");
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
});
