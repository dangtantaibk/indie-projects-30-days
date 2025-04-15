# Gistify

A powerful command-line tool for creating, managing, and sharing code snippets through GitHub Gists.

## Features

- Create public/private gists from one or multiple files
- List your gists with detailed information
- Get detailed information about specific gists
- Update existing gists
- Delete gists
- User-friendly interface with loading indicators
- Proper error handling and validation

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Build the project
npm run build

# Link the CLI globally (optional)
npm link
```

## Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your GitHub Personal Access Token:
   ```
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

   To create a token:
   1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
   2. Generate a new token with the `gist` scope
   3. Copy the token and paste it in your `.env` file

## Usage

### Create a Gist

Create a new gist from one or more files:

```bash
# Create a public gist
gistify create example.js -d "My example code"

# Create a private gist
gistify create example.js -d "My private code" -p

# Create a gist with multiple files
gistify create file1.js file2.js -d "Multiple files example"
```

### List Gists

List your gists with various options:

```bash
# List your gists (default shows 10)
gistify list

# List with a specific limit
gistify list --limit 5
```

### Get Gist Details

Get detailed information about a specific gist:

```bash
gistify get <gist-id>
```

### Update a Gist

Update an existing gist with new files or content:

```bash
gistify update <gist-id> file1.js -d "Updated description"
```

### Delete a Gist

Delete a gist:

```bash
gistify delete <gist-id>
```

## Development

```bash
# Run in development mode
npm run dev

# Build the project
npm run build

# Run tests (when implemented)
npm test
```

## Error Handling

The CLI includes comprehensive error handling:
- Validates GitHub token configuration
- Checks file existence before operations
- Provides clear error messages for API issues
- Handles network and permission errors gracefully

## License

ISC