import axios from 'axios'
import {parseStringPromise} from 'xml2js'
import Character from '../../entities/character.js'

const URL = 'https://gist.githubusercontent.com/ErickWendel/927970b8fa7117182413be100417607d/raw/d78adae11f5bdbff086827bf45f1bc649c339766/rick-and-morty-characters.xml'

export default class RickAndMortyUSA {
    static async getCharactersFromXML() {
        const { data } = await axios.get(URL)
        const option = {
            explicitArray: false,
            explicitRoot: false
        }
        const { results: { element: results = [] } } = await parseStringPromise(data, option)
        const defaultFormat = Array.isArray(results) ? results : [results]
        return defaultFormat.map(char => new Character(char))
    }
}
