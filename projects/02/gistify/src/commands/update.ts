import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import { GitHubClient } from '../utils/github';
import { validateFiles } from '../utils/config';
import { withSpinner } from '../utils/ui';

export const updateCommand = new Command('update')
    .description('Update an existing gist')
    .argument('<gist-id>', 'ID of the gist to update')
    .argument('<files...>', 'Files to update in the gist')
    .option('-d, --description <description>', 'New description for the gist')
    .addHelpText('after', `
Examples:
  # Update a gist with a single file
  $ gistify update abc123def456 updated-script.js

  # Update a gist with multiple files
  $ gistify update abc123def456 file1.js file2.js

  # Update a gist's files and description
  $ gistify update abc123def456 config.json -d "Updated configuration"

  # The gist ID can be found in the gist URL or by using 'gistify list'
  # Example URL: https://gist.github.com/username/abc123def456
    `)
    .action(async (gistId: string, files: string[], options) => {
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
                async () => github.updateGist(
                    gistId,
                    gistFiles,
                    options.description
                ),
                'Updating gist...',
                'Gist updated successfully! 🔄'
            );

            console.log(`\nDescription: ${gist.description || '(no description)'}`);
            console.log(`URL: ${gist.html_url}`);
            console.log('\nUpdated files:');
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