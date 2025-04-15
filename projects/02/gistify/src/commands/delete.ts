import { Command } from 'commander';
import { GitHubClient } from '../utils/github';
import { withSpinner } from '../utils/ui';
import prompts from 'prompts';

export const deleteCommand = new Command('delete')
    .description('Delete a gist')
    .argument('<gist-id>', 'ID of the gist to delete')
    .option('-f, --force', 'Skip confirmation prompt')
    .addHelpText('after', `
Examples:
  # Delete a gist with confirmation prompt
  $ gistify delete abc123def456

  # Delete a gist without confirmation
  $ gistify delete abc123def456 --force

  # The gist ID can be found in the gist URL or by using 'gistify list'
  # Example URL: https://gist.github.com/username/abc123def456

Note: This action cannot be undone. Use with caution.
    `)
    .action(async (gistId: string, options) => {
        try {
            const github = new GitHubClient();

            // Get gist details first to show what will be deleted
            const gist = await withSpinner(
                async () => github.getGist(gistId),
                'Fetching gist details...'
            );

            console.log('\nGist to delete:');
            console.log(`Description: ${gist.description || '(no description)'}`);
            console.log(`Visibility: ${gist.public ? '🌎 Public' : '🔒 Private'}`);
            if (gist.files) {
                console.log('Files:');
                Object.keys(gist.files).forEach(filename => {
                    console.log(`  - ${filename}`);
                });
            }

            // Ask for confirmation unless --force is used
            if (!options.force) {
                const response = await prompts({
                    type: 'confirm',
                    name: 'value',
                    message: 'Are you sure you want to delete this gist? This action cannot be undone.',
                    initial: false
                });

                if (!response.value) {
                    console.log('\nDeletion cancelled.');
                    process.exit(0);
                }
            }

            await withSpinner(
                async () => github.deleteGist(gistId),
                'Deleting gist...',
                'Gist deleted successfully! 🗑️'
            );
        } catch (error) {
            if (error instanceof Error) {
                console.error('\nError:', error.message);
            } else {
                console.error('\nAn unknown error occurred');
            }
            process.exit(1);
        }
    });