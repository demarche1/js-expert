import {expect, describe, test, jest, beforeEach} from '@jest/globals'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter'
import RickAndMortyUSA from '../../src/business/integration/rickAndMortyUSA'

describe('#RickAndMortyUSAAdapter', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('#getCharacters should be an adapter for rickAndMortyUSA.getCharacterXML', async () => {
        const usaIntegration = jest.spyOn(
            RickAndMortyUSA,
            RickAndMortyUSA.getCharactersFromXML.name
        ).mockResolvedValue([])

        const result = await RickAndMortyUSAAdapter.getCharacters()
        expect(usaIntegration).toHaveBeenCalled()
    })
})