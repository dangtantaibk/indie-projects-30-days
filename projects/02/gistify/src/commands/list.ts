import { Command } from 'commander';
import { GitHubClient } from '../utils/github';
import { withSpinner } from '../utils/ui';

export const listCommand = new Command('list')
    .description('List your gists')
    .option('-l, --limit <number>', 'Limit the number of gists shown', '10')
    .option('--private', 'Show only private gists')
    .option('--public', 'Show only public gists')
    .addHelpText('after', `
Examples:
  # List all gists (default limit: 10)
  $ gistify list

  # List with a custom limit
  $ gistify list --limit 5

  # Show only private gists
  $ gistify list --private

  # Show only public gists
  $ gistify list --public

  # Combine options
  $ gistify list --public --limit 3
    `)
    .action(async (options) => {
        try {
            const github = new GitHubClient();
            const gists = await withSpinner(
                async () => github.listGists(),
                'Fetching gists...',
                'Gists retrieved successfully'
            );

            let filteredGists = gists;
            if (options.private) {
                filteredGists = gists.filter(gist => !gist.public);
            } else if (options.public) {
                filteredGists = gists.filter(gist => gist.public);
            }

            const limit = Math.min(parseInt(options.limit), filteredGists.length);

            if (filteredGists.length === 0) {
                console.log('\nNo gists found.');
                if (options.private) {
                    console.log('Tip: You don\'t have any private gists. Create one with: gistify create <file> -p');
                } else if (options.public) {
                    console.log('Tip: You don\'t have any public gists. Create one with: gistify create <file>');
                } else {
                    console.log('Tip: Create your first gist with: gistify create <file>');
                }
                return;
            }

            console.log('\nYour Gists:');
            console.log('===========\n');

            filteredGists.slice(0, limit).forEach((gist, index) => {
                const visibility = gist.public ? '🌎 Public' : '🔒 Private';
                console.log(`${index + 1}. ${visibility} | ${gist.description || '(no description)'}`);
                console.log(`   ID: ${gist.id}`);
                console.log(`   Created: ${new Date(gist.created_at).toLocaleString()}`);
                if (gist.files) {
                    const fileCount = Object.keys(gist.files).length;
                    console.log(`   Files (${fileCount}): ${Object.keys(gist.files).join(', ')}`);
                }
                console.log(`   URL: ${gist.html_url}`);
                console.log();
            });

            // Show summary
            const totalCount = filteredGists.length;
            const privateCount = filteredGists.filter(gist => !gist.public).length;
            const publicCount = filteredGists.filter(gist => gist.public).length;

            console.log('Summary:');
            console.log(`Total gists: ${totalCount}`);
            console.log(`Private gists: ${privateCount}`);
            console.log(`Public gists: ${publicCount}`);

            if (totalCount > limit) {
                console.log(`\nShowing ${limit} of ${totalCount} gists. Use --limit to see more.`);
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