class Transaction {
  constructor({ custumer, car, finalPrice, dueDate }) {
    this.custumer = custumer;
    this.car = car;
    this.finalPrice = finalPrice;
    this.dueDate = dueDate;
  }
}

module.exports = Transaction;
