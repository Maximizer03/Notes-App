const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.red("New Note added"));
    } else {
        console.log(chalk.green("Note title already taken"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        return data;
    } catch (e) {
        return [];
    }
}

const listNotes = () => {
    console.log(chalk.yellow.inverse("Your Notes"));
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(chalk.blue.inverse(note.title));
    })
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title != title)
    saveNotes(newNotes);
    if (newNotes.length === notes.length) {
        console.log(chalk.red("No note found!"));
    } else {
        console.log(chalk.green("Note removed"));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse("Note not found"));
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}
