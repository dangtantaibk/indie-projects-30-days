#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const dotenv_1 = __importDefault(require("dotenv"));
const create_1 = require("./commands/create");
const list_1 = require("./commands/list");
dotenv_1.default.config();
commander_1.program
    .name('gistify')
    .description('CLI tool for managing GitHub Gists')
    .version('1.0.0');
commander_1.program.addCommand(create_1.createCommand);
commander_1.program.addCommand(list_1.listCommand);
commander_1.program.parse(process.argv);
