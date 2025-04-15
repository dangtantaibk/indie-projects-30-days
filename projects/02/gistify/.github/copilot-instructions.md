<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a CLI application for managing GitHub Gists. The codebase uses:
- TypeScript for type safety
- Commander.js for CLI argument parsing
- Octokit for GitHub API integration
- dotenv for environment variable management

Key features:
- Create gists from files (public/private)
- List user's gists
- Get gist details
- Update existing gists
- Delete gists

When suggesting code:
- Use async/await for asynchronous operations
- Include proper error handling
- Follow TypeScript best practices
- Use Commander.js patterns for CLI commands
- Include JSDoc comments for functions