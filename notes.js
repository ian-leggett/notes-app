const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New notes added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed'))
  } else {
    console.log(chalk.red.inverse('No note found'))
  }
  saveNotes(notesToKeep)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.inverse('Your notes...'))
  notes.forEach((note, index) => {
    index++
    console.log(index + `. Title: ${note.title}`)
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const noteFound = notes.find((note) => note.title === title)
  if (noteFound) {
    console.log(
      `Title: ${noteFound.title}\nBody: ${noteFound.body}`
    )
  } else{
    console.log(chalk.inverse.red('No note found'))
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
}