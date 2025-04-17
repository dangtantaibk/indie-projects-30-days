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

            let gist;
            try {
                gist = await withSpinner(
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
            } catch (apiError) {
                console.error('\nError creating gist!');
                
                if (apiError instanceof Error && apiError.message.includes('Not Found')) {
                    console.error('\nPossible causes:');
                    console.error('  1. Your GitHub token may be invalid or expired');
                    console.error('  2. Your token may not have the "gist" scope permission');
                    console.error('  3. There may be network connectivity issues\n');
                    console.error('Troubleshooting steps:');
                    console.error('  1. Check your GITHUB_TOKEN in .env file');
                    console.error('  2. Generate a new token at https://github.com/settings/tokens');
                    console.error('     Make sure to select the "gist" scope permission');
                    console.error('  3. Check your internet connection');
                } else {
                    console.error('\n', apiError instanceof Error ? apiError.message : 'Unknown error occurred');
                }
                process.exit(1);
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