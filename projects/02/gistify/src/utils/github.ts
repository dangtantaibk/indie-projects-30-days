import { Octokit } from '@octokit/rest';
import { validateGitHubToken } from './config';

export class GitHubClient {
    private octokit: Octokit;

    constructor() {
        validateGitHubToken();
        this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    }

    /**
     * Creates a new gist
     * @param files Object containing file names and their content
     * @param description Gist description
     * @param isPublic Whether the gist should be public
     * @returns Created gist data
     */
    async createGist(files: { [key: string]: { content: string } }, description: string, isPublic: boolean) {
        try {
            const response = await this.octokit.gists.create({
                files,
                description,
                public: isPublic
            });
            return response.data;
        } catch (error: any) {
            if (error.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and try again.');
            }
            throw new Error(`Failed to create gist: ${error.message}`);
        }
    }

    /**
     * Lists all gists for the authenticated user
     * @returns Array of gist data
     */
    async listGists() {
        try {
            const response = await this.octokit.gists.list();
            return response.data;
        } catch (error: any) {
            if (error.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and try again.');
            }
            throw new Error(`Failed to list gists: ${error.message}`);
        }
    }

    /**
     * Gets details of a specific gist
     * @param gistId ID of the gist to retrieve
     * @returns Gist data
     */
    async getGist(gistId: string) {
        try {
            const response = await this.octokit.gists.get({ gist_id: gistId });
            return response.data;
        } catch (error: any) {
            if (error.status === 404) {
                throw new Error(`Gist not found: ${gistId}`);
            }
            if (error.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and try again.');
            }
            throw new Error(`Failed to get gist: ${error.message}`);
        }
    }

    /**
     * Updates an existing gist
     * @param gistId ID of the gist to update
     * @param files Object containing file names and their content
     * @param description Optional new description for the gist
     * @returns Updated gist data
     */
    async updateGist(gistId: string, files: { [key: string]: { content: string } }, description?: string) {
        try {
            const response = await this.octokit.gists.update({
                gist_id: gistId,
                files,
                description
            });
            return response.data;
        } catch (error: any) {
            if (error.status === 404) {
                throw new Error(`Gist not found: ${gistId}`);
            }
            if (error.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and try again.');
            }
            if (error.status === 403) {
                throw new Error('You do not have permission to update this gist.');
            }
            throw new Error(`Failed to update gist: ${error.message}`);
        }
    }

    /**
     * Deletes a gist
     * @param gistId ID of the gist to delete
     * @returns true if deletion was successful
     */
    async deleteGist(gistId: string) {
        try {
            await this.octokit.gists.delete({ gist_id: gistId });
            return true;
        } catch (error: any) {
            if (error.status === 404) {
                throw new Error(`Gist not found: ${gistId}`);
            }
            if (error.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and try again.');
            }
            if (error.status === 403) {
                throw new Error('You do not have permission to delete this gist.');
            }
            throw new Error(`Failed to delete gist: ${error.message}`);
        }
    }
}