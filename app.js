const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// add command
yargs.command({
    command: "add",
    describe: "used to add a note",
    builder: {
        title: {
            describe: "title of the new note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "body of the new note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
})

// remove command
yargs.command({
    command: "remove",
    describe: "This command removes the note with title",
    builder: {
        title: {
            describe: "title of the note to be removed",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
})

// read command
yargs.command({
    command: "list",
    describe: "listing all node with their titles and body",
    handler() {
        notes.listNotes();
    }

})

yargs.command({
    command: "read",
    describe: "This command reads the note with title",
    builder: {
        title: {
            describe: "title of the note to be read",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

console.log(yargs.argv);