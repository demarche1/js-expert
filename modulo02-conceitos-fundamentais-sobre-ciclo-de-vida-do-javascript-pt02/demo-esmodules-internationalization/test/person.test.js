import {describe, it} from 'mocha'
import {expect} from 'chai'
import sinon from "sinon";
import {Person} from "../src/Person.js";

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