import RickAndMortyBRL from "../integration/rickAndMortyBRL.js";

export default class RickAndMortyBRLAdapter {
    static async getCharacters() {
        return await RickAndMortyBRL.getCharactersFromJSON()
    }
}