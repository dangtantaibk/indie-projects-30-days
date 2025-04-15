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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = void 0;
const commander_1 = require("commander");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const github_1 = require("../utils/github");
exports.createCommand = new commander_1.Command('create')
    .description('Create a new gist from file(s)')
    .argument('<files...>', 'Files to include in the gist')
    .option('-d, --description <description>', 'Description of the gist')
    .option('-p, --private', 'Create as private gist')
    .action((files, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const github = new github_1.GitHubClient();
        const gistFiles = {};
        // Read all files
        for (const file of files) {
            const content = yield promises_1.default.readFile(file, 'utf-8');
            gistFiles[path_1.default.basename(file)] = { content };
        }
        const gist = yield github.createGist(gistFiles, options.description || '', !options.private);
        console.log('Gist created successfully!');
        console.log(`URL: ${gist.html_url}`);
    }
    catch (error) {
        console.error('Error creating gist:', error.message);
        process.exit(1);
    }
}));
