const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const start = async () => {
    await inquirer.prompt({type: 'confirm', message: 'Are you a Manager?', default: false, name: 'confirmAuth'}).then(ans => {
        if (ans.confirmAuth === false){
            console.log('You are not authorized to run this program. Please get the Manager.');
            return
        }
    })
}

start();