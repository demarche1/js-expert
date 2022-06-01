import {readFile, writeFile} from 'fs/promises'

export const save = async data => {
  const {pathname} = new URL('./../database.json', import.meta.url)

  const database = JSON.parse(await readFile(pathname))
  database.push(data)

  await writeFile(pathname, JSON.stringify(database))
}