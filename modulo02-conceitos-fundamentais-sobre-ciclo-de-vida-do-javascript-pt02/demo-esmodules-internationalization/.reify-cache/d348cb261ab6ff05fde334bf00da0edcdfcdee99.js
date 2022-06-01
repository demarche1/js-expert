"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var sinon;module.link("sinon",{default(v){sinon=v}},2);var Person;module.link("../src/Person.js",{Person(v){Person=v}},3);




describe('Person', function () {
  it('Should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString('1 Navio,Carro 200000 2009-05-03 2022-06-01')

    const expected = {
      id: '1',
      vehicles: ['Navio', 'Carro'],
      kmTraveled: '200000',
      from: '2009-05-03',
      to: '2022-06-01'
    }

    expect(person).to.be.deep.equals(expected)
  })

  it('Should return a formatted data', () => {
    let person = new Person({
      id: '1',
      vehicles: ['Navio', 'Carro'],
      kmTraveled: '200000',
      from: '2009-05-03',
      to: '2022-06-01'
    })
    const spy = sinon.spy(person, person.formatted.name)
    person = person.formatted('pt-BR')

    const expected = {
      id: 1,
      vehicles: 'Navio e Carro',
      kmTraveled: '200.000 km',
      from: '03 de maio de 2009',
      to: '01 de junho de 2022'
    }

    expect(spy.callCount).to.be.deep.equal(1)
    expect(person).to.be.deep.equal(expected)
  })
});