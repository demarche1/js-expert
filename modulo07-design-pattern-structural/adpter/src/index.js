import RickAndMortyBRLAdapter from "./business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

const data = [
    RickAndMortyBRLAdapter,
    RickAndMortyUSAAdapter
].map(integration => integration.getCharacters())

const all = await Promise.allSettled(data)
const successes = all
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value)
    .reduce((prev, curr) => prev.concat(curr), [])


console.table(successes)
