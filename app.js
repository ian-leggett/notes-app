const chalk = require('chalk')
const yargs = require('yargs')
const note = require('./notes.js')

// Create add command

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    }
  },
  handler (argv) {
    note.addNote(argv.title, argv.body)
  }
})

// Create remove command

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: false,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: false,
      type: 'string',
    }
  },
  handler (argv) {
    note.removeNote(argv.title, argv.body)
  }
})

// List command

yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler () {
    note.listNotes()
  }
})

// Read command

yargs.command({
  command: 'read',
  describe: 'Reads your notes',
  builder: {
    title: {
      describe: 'Reads a note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: false,
      type: 'string',
    }
  },
  handler (argv) {
    note.readNote(argv.title)
  }
})

yargs.parse()
