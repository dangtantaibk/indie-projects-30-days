import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import { GitHubClient } from '../utils/github';
import { validateFiles } from '../utils/config';
import { withSpinner } from '../utils/ui';

export const createCommand = new Command('create')
    .description('Create a new gist from file(s)')
    .argument('<files...>', 'Files to include in the gist')
    .option('-d, --description <description>', 'Description of the gist')
    .option('-p, --private', 'Create as private gist')
    .addHelpText('after', `
Examples:
  # Create a public gist from a single file
  $ gistify create script.js -d "My JavaScript utility"

  # Create a private gist
  $ gistify create config.json -d "Configuration file" -p

  # Create a gist with multiple files
  $ gistify create index.ts types.ts -d "TypeScript project files"

  # Create a gist without a description
  $ gistify create README.md
    `)
    .action(async (files: string[], options) => {
        try {
            await validateFiles(files);
            
            const github = new GitHubClient();
            const gistFiles: { [key: string]: { content: string } } = {};

            await withSpinner(
                async () => {
                    for (const file of files) {
                        const content = await fs.readFile(file, 'utf-8');
                        gistFiles[path.basename(file)] = { content };
                    }
                },
                'Reading files...'
            );

            const gist = await withSpinner(
                async () => github.createGist(
                    gistFiles,
                    options.description || '',
                    !options.private
                ),
                'Creating gist...',
                'Gist created successfully! 🎉'
            );

            console.log(`\nDescription: ${gist.description || '(no description)'}`);
            console.log(`URL: ${gist.html_url}`);
            console.log('\nFiles:');
            if (gist.files) {
                Object.keys(gist.files).forEach(filename => {
                    console.log(`  - ${filename}`);
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('\nError:', error.message);
            } else {
                console.error('\nAn unknown error occurred');
            }
            process.exit(1);
        }
    });