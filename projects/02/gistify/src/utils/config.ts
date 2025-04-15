/**
 * Configuration utilities for the CLI
 */

/**
 * Validates that the GitHub token is configured
 * @throws {Error} If GITHUB_TOKEN is not set
 */
export function validateGitHubToken(): void {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        console.error('\nError: GitHub token not found!');
        console.error('\nPlease set up your GitHub token:');
        console.error('1. Create a token at https://github.com/settings/tokens');
        console.error('2. Create a .env file in the project root');
        console.error('3. Add your token: GITHUB_TOKEN=your_token_here\n');
        process.exit(1);
    }
}

/**
 * Validates that required files exist
 * @param files Array of file paths to validate
 * @throws {Error} If any file doesn't exist
 */
export async function validateFiles(files: string[]): Promise<void> {
    const fs = await import('fs/promises');
    
    for (const file of files) {
        try {
            await fs.access(file);
        } catch (error) {
            console.error(`\nError: File not found: ${file}`);
            process.exit(1);
        }
    }
}