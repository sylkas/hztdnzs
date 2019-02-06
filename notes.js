const http = require('./http');
const { writeToFile, readFromFile } = require('./fs');

async function createNote(note) {

        let notes = [];        
        try {
            const result = await readFromFile();
            notes = result;
            notes.push(note);
            try {
                await writeToFile(notes);
            } catch(error) {
                console.log(error.message);
            }                
         } catch(error) {
             if(error.code = 'ENOENT ') {
                notes.push(note);
                try {
                    await writeToFile(notes);
                } catch(error) {
                    console.log(error.message);
                } 
                console.log(notes);               
             }
            console.log(error.message);
         }

    return 'Save to file';
}

async function listNotes() {
    try {
        const result = await readFromFile();
        return result;
    } catch (error) {
        console.log(error.message);
    }    
}

async function deleteNote(noteId) {
    try {
        const result = await readFromFile();
        let newList = result;
        newList.splice(noteId, 1);
        try {
            await writeToFile(newList);          
        } catch (error) {
            console.log(error.message);  
        }     
    } catch (error) {
        console.log(error.message);
    }
    
}

async function changeNote(noteId, noteStatus) {
    try {
        const result = await readFromFile();
        let newList = result;
        let newItem = newList[noteId];
        newItem.status = noteStatus;
        newList[noteId] = newItem;
        await writeToFile(newList);
    } catch (error) {
        console.log(error.message);
    }
}

async function filterStatus(noteStatus){
    try {
        const result = await readFromFile();
        let newList = result.filter(note => note.status === noteStatus);
        return newList;
    } catch (error) {
        console.log(error.message);
    }   
}

async function filterGroup(noteGroup){
    try {
        const result = await readFromFile();
        let newList = result.filter(note => note.group === noteGroup);
        return newList;
    } catch (error) {
        console.log(error.message);
    }   
}
     
async function uploadNotes() {
    try {
        const result = await readFromFile();
        const response = await http.post('http://api.quuu.linuxpl.eu/todo/azzqlhwv', {notes: result});
        return response.status;
    } catch (error) {
        console.log(error.message);
    }    
   
}

async function downloadNotes() {
    const response = await http.get(`http://api.quuu.linuxpl.eu/todo/azzqlhwv`);
    let apiNotes = response.data;
    await writeToFile(apiNotes.notes);
    return "Downloaded";
}

module.exports = {
    createNote,
    listNotes,
    deleteNote,
    changeNote,
    filterStatus,
    filterGroup,
    uploadNotes,
    downloadNotes
};
