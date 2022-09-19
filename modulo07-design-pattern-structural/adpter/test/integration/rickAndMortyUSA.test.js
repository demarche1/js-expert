import {expect, describe, test, jest, beforeEach} from '@jest/globals'
import axios from 'axios'
import {readFile} from 'fs/promises'
import RickAndMortyUSA from '../../src/business/integration/rickAndMortyUSA'
import Character from '../../src/entities/character'

describe('#RickAndMortyUSA', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('#getCharactersFromXML should return a list of Character Entity', async () => {
        const response = await readFile('./test/mocks/character.xml')
        const expected = [{"gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type": "Superhuman (Ghost trains summoner)"}]

        jest.spyOn(axios, 'get').mockResolvedValue({ data: response })
        
        const result = await RickAndMortyUSA.getCharactersFromXML()

        expect(result).toMatchObject(expected)
    })
    test('#getCharactersFromXML should return an empty list if the API return nothing', async () => {
        const response = await readFile('./test/mocks/character-empty.xml')
        const expected = []
        jest.spyOn(axios, 'get').mockResolvedValue({ data: response })
        const result = await RickAndMortyUSA.getCharactersFromXML()

        expect(result).toStrictEqual(expected)
    })
})