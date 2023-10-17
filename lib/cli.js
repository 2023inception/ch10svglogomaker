//Creating command-line prompts 
import {inquirer} from 'inquirer';
//used for file paths 
const {join} = require('path');
const {writeFile} =  require('fs/promises');
//custom function for a document module 
const {createDocument} = require('./document');

const readline = require('readline');

class PromptCLI {
    constructor() {
        this.text = '';
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    get_input() {
        return new Promise((resolve) => {
            const prompt = `Enter up to three characters: `;
            this.rl.question(prompt, (input) => {
                if (input.length <= 3) {
                    this.text = input;
                    resolve();
                } else {
                    console.log('Please enter up to three characters.');
                    this.get_input().then(resolve);
                }
            });
        });
    }

    run() {
        console.log('Welcome to the Three Character CLI!');
        this.get_input().then(() => {
            console.log(`You entered: ${this.text}`);
            this.rl.close();
        });
    }
}

if (require.main === module) {
    const cli = new ThreeCharacterCLI();
    cli.run();
}
