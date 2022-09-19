import {expect, describe, test, jest, beforeEach} from '@jest/globals'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter'
import RickAndMortyBRL from '../../src/business/integration/rickAndMortyBRL'

describe('#RickAndMortyBRLAdapter', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('#getCharacters should be an adapter for rickAndMortyBRL.getCharacterJSON', async () => {
        const brlIntegration = jest.spyOn(
            RickAndMortyBRL,
            RickAndMortyBRL.getCharactersFromJSON.name
        ).mockResolvedValue([])

        const result = await RickAndMortyBRLAdapter.getCharacters()
        expect(brlIntegration).toHaveBeenCalled()
    })
})