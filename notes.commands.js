
const {
    createNote,
    listNotes,
    deleteNote,
    changeNote,
    filterStatus,
    filterGroup,
    uploadNotes,
    downloadNotes
} = require('./notes')

const createCommand = {
    command: 'add:note',
    describe: 'Add new note [--content --group --status]',
    handler: async args => {
        const note = {
            content: args.content,
            group: args.group,
            status: args.status
        }
        const result = await createNote(note);
        console.log(result);             
    }
};

const listCommand = {
    command: 'list:all',
    describe: 'List all notes',
    handler: async args => {
        try {
            const notes = await listNotes();
            notes.forEach((note, key) => console.log(`${key}: ${note.content} ${note.group} ${note.status}`));
        } catch (error) {
            console.log(error.message);
        }
    }
};

const deleteCommand = {
    command: 'delete:note',
    describe: 'Delete note [--id]',
    handler: async args => {
        try {
            await deleteNote(args.id);
            console.log("Deleted");
        } catch (error) {
            console.log(error.message);
        }
    }
};

const changeCommand = {
    command: 'change:status',
    describe: 'Change status [--id --status]',
    handler: async args => {
        try {
            await changeNote(args.id, args.status);
            console.log(`Id: ${args.id} - changed`);
        } catch (error) {
            console.log(error.message);
        }
    }
};

const filterStatusCommand = {
    command: 'filter:status',
    describe: 'Filter status [--status]',
    handler: async args => {
        try {
            const notes = await filterStatus(args.status);
            notes.forEach((note, key) => console.log(`${key}: ${note.content} ${note.group} ${note.status}`));
        } catch (error) {
            console.log(error.message);
        }
    }
};

const filterGroupCommand = {
    command: 'filter:group',
    describe: 'Filter group [--group]',
    handler: async args => {
        try {
            const notes = await filterGroup(args.group);
            notes.forEach((note, key) => console.log(`${key}: ${note.content} ${note.group} ${note.status}`));
        } catch (error) {
            console.log(error.message);
        }
    }
};

const uploadCommand = {
    command: 'api:upload',
    describe: 'API upload',
    handler: async args => {
        try {
            const result = await uploadNotes();
            if(result === 201) {
                console.log("Uploaded");
            }
        } catch (error) {
            console.log(error.message);
        }
    }    
};

const downloadCommand = {
    command: 'api:download',
    describe: 'API download',
    handler: async args => {
        try {
            const result = await downloadNotes();
            console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    }    
};

module.exports = [ 
    createCommand,
    listCommand,
    deleteCommand,
    changeCommand,
    filterStatusCommand,
    filterGroupCommand,
    uploadCommand,
    downloadCommand
];