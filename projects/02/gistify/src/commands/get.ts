import { Command } from 'commander';
import { GitHubClient } from '../utils/github';
import { withSpinner } from '../utils/ui';

export const getCommand = new Command('get')
    .description('Get details of a specific gist')
    .argument('<gist-id>', 'ID of the gist to retrieve')
    .addHelpText('after', `
Examples:
  # Get details of a specific gist
  $ gistify get abc123def456

  # The gist ID can be found in the gist URL or by using 'gistify list'
  # Example URL: https://gist.github.com/username/abc123def456
    `)
    .action(async (gistId: string) => {
        try {
            const github = new GitHubClient();
            const gist = await withSpinner(
                async () => github.getGist(gistId),
                'Fetching gist details...',
                'Gist details retrieved successfully'
            );

            console.log('\nGist Details:');
            console.log(`ID: ${gist.id}`);
            console.log(`Description: ${gist.description || '(no description)'}`);
            console.log(`URL: ${gist.html_url}`);
            console.log(`Created: ${new Date(gist.created_at).toLocaleString()}`);
            console.log(`Updated: ${new Date(gist.updated_at).toLocaleString()}`);
            console.log('\nFiles:');
            if (gist.files) {
                Object.keys(gist.files).forEach(filename => {
                    const file = gist.files[filename];
                    console.log(`\n  ${filename}:`);
                    console.log(`  Type: ${file.type}`);
                    console.log(`  Size: ${file.size} bytes`);
                    console.log(`  Content:`);
                    console.log('  ' + file.content.split('\n').join('\n  '));
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