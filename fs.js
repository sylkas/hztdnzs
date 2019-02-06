const { writeFile, readFile} = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);

const fileName = 'notes.json';

async function writeToFile(note) {
    const notesToString = JSON.stringify(note);
    const response = await writeFileAsync(fileName, notesToString);
    return response;
}
async function readFromFile() {
    const response = await readFileAsync(fileName);
    return JSON.parse(response);
}  

module.exports = {
    writeToFile,
    readFromFile
};