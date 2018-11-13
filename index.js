#!/usr/bin/env node

const inquirer = require('inquirer');
const cfonts = require('cfonts');
const opn = require('opn');
const gitconfig = require('git-config-path');
const parse = require('parse-git-config');
const extend = require('extend-shallow');

const gc = gitconfig(extend({type: 'global'}, false));
const options = extend({cwd: '/', path: gc}, false);
const config = parse.sync(options) || {};
const username =  config.user ? config.user.name : 'stranger';

let promptMessage = 'What would you like to see next?';
const choices = [
  { txt: 'Twitter', action: 'twitter' },
  { txt: 'LinkedIn', action: 'LN' },
  { txt: 'GitHub', action: 'github' },
  { txt: 'StackOverflow', action: 'SO' },
  { txt: 'This is BS, just give me a CV', action: 'bs' },
  { txt: 'Quit', action: 'quit' }
];
const choice2fn = {
  'This is BS, just give me a CV': 'bs',
  'LinkedIn': 'LN',
  'StackOverflow': 'SO',
  'Twitter': 'twitter',
  'GitHub': 'github',
  'Quit': 'quit' 
};
let promptData = [
  {
    type: 'list',
    name: 'choice',
    message: '',
    choices: choices.map(choice => choice.txt),
  }
];

const actions = {
  bs() {
    opn('http://alou.io/cv/Loukakis,%20AndreasCV.pdf');
  },
  SO() {
    opn('https://stackoverflow.com/users/2661138/alou');
  },
  LN() {
    opn('https://www.linkedin.com/in/andreas-loukakis-85098532/');
  },
  twitter() {
    opn('https://twitter.com/AndreasLoukakis');
  },
  github() {
    opn('https://github.com/AndreasLoukakis');
  },
  quit() {
    console.log('\x1b[36m%s\x1b[0m', 'Thanks, Cya');
    process.exit();
  }
};

cfonts.say('Andreas Loukakis', {
  font: 'chrome',
  colors: ['blue', 'white', 'blue']
});

console.log('\x1b[36m%s\x1b[0m',`Hey ${username}.`, `Ι am Andreas Loukakis,
a front end developer with a marketing background. 
I enjoy exploring all web platform related technologies,
with strong experience on Javascript and related frameworks.
Mostly Angular flavors, less Vue and React.
`);

const actionsLoop = (newMsg) => {
  promptData[0].message = newMsg;
    inquirer
        .prompt(promptData)
        .then(answers => {
            console.info(`Going to ${answers.choice}...`)
            actions[choice2fn[answers.choice]]();
            actionsLoop(`OK with ${answers.choice}, what\'s next?`);
        });
}

actionsLoop('What would you like to see first?');