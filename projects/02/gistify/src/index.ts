#!/usr/bin/env node
import { program } from 'commander';
import dotenv from 'dotenv';
import { createCommand } from './commands/create';
import { listCommand } from './commands/list';
import { getCommand } from './commands/get';
import { updateCommand } from './commands/update';
import { deleteCommand } from './commands/delete';

dotenv.config();

program
  .name('gistify')
  .description('CLI tool for managing GitHub Gists')
  .version('1.0.0');

// Add commands with aliases for common operations
program
  .addCommand(createCommand.alias('c'))
  .addCommand(listCommand.alias('ls'))
  .addCommand(getCommand.alias('g'))
  .addCommand(updateCommand.alias('u'))
  .addCommand(deleteCommand.alias('rm'));

// Add global help information
program.addHelpText('after', `
Environment Setup:
  Make sure you have a GitHub token set in your .env file:
  GITHUB_TOKEN=your_github_personal_access_token_here

Quick Examples:
  $ gistify create file.js -d "Description"    Create a new public gist
  $ gistify ls                                 List your gists
  $ gistify g <gist-id>                       Get gist details
  $ gistify u <gist-id> file.js               Update a gist
  $ gistify rm <gist-id>                      Delete a gist

For more examples and detailed usage, run:
  $ gistify <command> --help
`);

program.parse(process.argv);