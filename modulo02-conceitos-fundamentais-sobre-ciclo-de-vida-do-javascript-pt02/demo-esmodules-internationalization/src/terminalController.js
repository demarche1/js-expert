import readline from "readline";
import chalk from "chalk";
import chalkTable from "chalk-table";
import {Person} from "./Person.js";
import DraftLog from "draftlog";

export class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
  }

  initializeTerminal(database, language){
    DraftLog.into(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.initializeTable(database, language)
  }

  initializeTable(database, language){
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(this.getTableOptions(), data)

    this.print = console.draft(table)
    this.data = data
  }

  updateTable(item) {
    this.data.push(item)
    this.print(chalkTable(this.getTableOptions(), this.data))
  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOptions(){
    return {
      leftPad: 2,
      columns: [
        {field: 'id', name: chalk.red('ID')},
        {field: 'vehicles', name: chalk.blue('Vehicles')},
        {field: 'kmTraveled', name: chalk.blue('Km Traveled')},
        {field: 'from', name: chalk.blue('From')},
        {field: 'to', name: chalk.blue('To')}
      ]
    }
  }

  question(msg = ''){
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }
}