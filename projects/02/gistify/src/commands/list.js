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
exports.listCommand = void 0;
const commander_1 = require("commander");
const github_1 = require("../utils/github");
exports.listCommand = new commander_1.Command('list')
    .description('List your gists')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const github = new github_1.GitHubClient();
        const gists = yield github.listGists();
        if (gists.length === 0) {
            console.log('No gists found.');
            return;
        }
        console.log('Your Gists:');
        gists.forEach(gist => {
            console.log(`\nID: ${gist.id}`);
            console.log(`Description: ${gist.description || '(no description)'}`);
            console.log(`URL: ${gist.html_url}`);
            console.log('Files:');
            Object.keys(gist.files).forEach(filename => {
                console.log(`  - ${filename}`);
            });
        });
    }
    catch (error) {
        console.error('Error listing gists:', error.message);
        process.exit(1);
    }
}));
