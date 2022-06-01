import database from "../database.json" assert {type: 'json'};
import {TerminalController} from './terminalController.js'
import {Person} from "./Person.js";
import {save} from "./repository.js";

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()

terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop(){
  try {
    const answer = await terminalController.question('Add something to list:  ')

    if(answer === STOP_TERM) {
      terminalController.closeTerminal()
      return;
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
    await save(person)

    return await mainLoop()

  } catch (e) {
    console.log(e)
    await mainLoop()
  }
}

await mainLoop()
