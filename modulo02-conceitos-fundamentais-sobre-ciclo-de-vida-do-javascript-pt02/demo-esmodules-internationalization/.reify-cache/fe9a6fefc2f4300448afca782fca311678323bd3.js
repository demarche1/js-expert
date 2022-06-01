"use strict";module.export({Person:()=>Person});class Person {
  constructor({ id, vehicles, kmTraveled, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  mapDate(date) {
    const [year, month, day] = date.split('-').map(Number)

    return new Date(year, (month - 1), day)
  }

  formatted(language) {
    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, {
        style: "long",
        type: "conjunction",
      }).format(this.vehicles),
      kmTraveled: new Intl.NumberFormat(language,{
        style: 'unit',
        unit: 'kilometer'
      }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric"
      }).format(this.mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric"
      }).format(this.mapDate(this.to)),
    };
  }

  static generateInstanceFromString(answer){
    const EMPTY_SPACE = ' '

    const [id, vehicles, kmTraveled, from, to] = answer.split(EMPTY_SPACE)

    return new Person({
      id,
      vehicles: vehicles.split(','),
      kmTraveled,
      from,
      to
    })
  }
}
