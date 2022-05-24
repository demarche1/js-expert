const BaseRepository = require("../repository/base/base");
const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");

class CarService {
  constructor({ cars }) {
    this.carsRepository = new BaseRepository({ file: cars });
    this.currentFormat = Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    this.taxBasedOnAge = Tax.taxBasedOnAge;
  }

  getRandomPositionFromArray(list) {
    return Math.floor(Math.random() * list.length);
  }

  chooseRandomCar(carCategory) {
    const randomCarId = this.getRandomPositionFromArray(carCategory.carIds);

    return carCategory.carIds[randomCarId];
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carsRepository.find(carId);

    return car;
  }

  calculateFinalPrice({ custumer, carCategory, numberOfDays }) {
    const { age } = custumer;
    const { price } = carCategory;
    const { then: tax } = this.taxBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = price * tax * numberOfDays;
    const formatedFinalPrice = this.currentFormat.format(finalPrice);

    return formatedFinalPrice;
  }

  async rent({ custumer, carCategory, numberOfDays }) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = this.calculateFinalPrice({
      custumer,
      carCategory,
      numberOfDays,
    });
    const today = new Date();

    today.setDate(today.getDate() + numberOfDays);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const dueDate = today.toLocaleDateString("pt-br", options);
    const transaction = new Transaction({
      custumer,
      car,
      finalPrice,
      dueDate,
    });

    return transaction;
  }
}

module.exports = CarService;
