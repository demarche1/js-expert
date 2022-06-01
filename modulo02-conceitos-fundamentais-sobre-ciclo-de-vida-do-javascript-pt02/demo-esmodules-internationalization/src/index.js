import database from './../database.json' assert {type: 'json'}
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'
import {Person} from "./Person.js";

DraftLog.into(console).addLineListener(process.stdin)

const options = {
  leftPad: 4,
  columns: [
    {field: 'id', name: chalk.cyan('ID')},
    {field: 'vehicles', name: chalk.magenta('Vehicles')},
    {field: 'kmTraveled', name: chalk.cyan('Km Traveled')},
    {field: 'from', name: chalk.cyan('From')},
    {field: 'to', name: chalk.cyan('To')}
  ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatted('pt-br')))
const draft = console.draft(table)

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

terminal.question('Qual é seu nome? ', msg => {
  console.log('message: ', msg)
})

