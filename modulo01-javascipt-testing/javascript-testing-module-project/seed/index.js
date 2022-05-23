const { faker } = require("@faker-js/faker");

const { join } = require("path");
const { writeFile } = require("fs/promises");

const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Custumer = require("../src/entities/custumer");

const seederBaseFolder = join(__dirname, "../", "database");
const ITEMS_AMOUNT = 2;

function randomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const custumers = [];
for (let i = 0; i <= ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  const custumer = new Custumer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: randomAge(18, 50),
  });

  cars.push(car);
  custumers.push(custumer);
  carCategory.carIds.push(car.id);
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {
  await write("car.json", cars);
  await write("custumers.json", custumers);
  await write("carCategories.json", [carCategory]);

  console.log("cars", cars);
  console.log("custumers.json", custumers);
  console.log("carCategories", carCategory);
})();
