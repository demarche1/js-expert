import {expect, describe, test, jest, beforeEach} from '@jest/globals'
import axios from 'axios'
import {readFile} from 'fs/promises'
import RickAndMortyBRL from '../../src/business/integration/rickAndMortyBRL'
import Character from '../../src/entities/character'

describe('#RickAndMortyBRL', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('#getCharactersFromJSON should return a list of Character Entity', async () => {
        const response = JSON.parse(await readFile('./test/mocks/character.json'))
        const expected = response.results.map(char => new Character(char))
        jest.spyOn(axios, 'get').mockResolvedValue({ data: response })
        const result = await RickAndMortyBRL.getCharactersFromJSON()

        expect(result).toStrictEqual(expected)
    })
    test('#getCharactersFromJSON should return an empty list if the API return nothing', async () => {
        const { results: expected } = JSON.parse(await readFile('./test/mocks/character-empty.json'))

        jest.spyOn(axios, 'get').mockResolvedValue({ data: expected })
        const result = await RickAndMortyBRL.getCharactersFromJSON()

        expect(result).toStrictEqual(expected)
    })
})