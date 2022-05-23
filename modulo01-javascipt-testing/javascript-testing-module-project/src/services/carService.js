const BaseRepository = require("../repository/base/base");

class CarService {
  constructor({ cars }) {
    this.carsRepository = new BaseRepository({ file: cars });
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
}

module.exports = CarService;
