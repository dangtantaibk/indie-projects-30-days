"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubClient = void 0;
const rest_1 = require("@octokit/rest");
class GitHubClient {
    constructor() {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('GITHUB_TOKEN environment variable is required');
        }
        this.octokit = new rest_1.Octokit({ auth: token });
    }
    createGist(files, description, isPublic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.octokit.gists.create({
                    files,
                    description,
                    public: isPublic
                });
                return response.data;
            }
            catch (error) {
                throw new Error(`Failed to create gist: ${error.message}`);
            }
        });
    }
    listGists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.octokit.gists.list();
                return response.data;
            }
            catch (error) {
                throw new Error(`Failed to list gists: ${error.message}`);
            }
        });
    }
    getGist(gistId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.octokit.gists.get({ gist_id: gistId });
                return response.data;
            }
            catch (error) {
                throw new Error(`Failed to get gist: ${error.message}`);
            }
        });
    }
    updateGist(gistId, files, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.octokit.gists.update({
                    gist_id: gistId,
                    files,
                    description
                });
                return response.data;
            }
            catch (error) {
                throw new Error(`Failed to update gist: ${error.message}`);
            }
        });
    }
    deleteGist(gistId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.octokit.gists.delete({ gist_id: gistId });
                return true;
            }
            catch (error) {
                throw new Error(`Failed to delete gist: ${error.message}`);
            }
        });
    }
}
exports.GitHubClient = GitHubClient;
