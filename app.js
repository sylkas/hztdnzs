const yargs = require('yargs');

const usersCommands = require('./notes.commands');

usersCommands.forEach(command => yargs.command(command));

yargs.argv;