const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const buildHTML = require('./util/generateHtml')

const team = [];

const employeeQuestions = [
    {
        name: 'role',
        type: 'list',
        message: 'Please choose the employee\'s role:',
        choices: ['engineer', 'intern']
    },
    {
        name: 'name',
        type: 'input',
        message: 'Please enter their first and last name:',
        validate(empAns){
            checkName(empAns.name);
        }
    },
    {
        name: 'id',
        type: 'number',
        message: 'Please enter the employee ID number:',
        validate(){
            if(NaN){
                console.log(`that's not a number`)
            }
        }
    },
    {
        name: 'email',
        type: 'input',
        message: 'Please enter their email:',
    },
    {
        name: 'github',
        type: 'input',
        message: 'Please enter their GitHub username:',
        when(empAns){
            return empAns.role === 'engineer';
        }
    },
    {
        name: 'school',
        type: 'input',
        message: 'Please enter the school they are attending:',
        when(empAns){
            return empAns.role === 'intern';
        }
    },

]

const getEmployee = async () => {
    await getOfficeNumber();
    inquirer.prompt(employeeQuestions).then(empAns => {
        if (empAns.role === 'engineer'){
            const employee = new Engineer(empAns.name, empAns.id, empAns.email, empAns.github);
            team.push(employee);
            console.log(team);
        } else {
            const employee = new Intern(empAns.name, empAns.id, empAns.email, empAns.school);
            team.push(employee);
            console.log(team);
        }
    })
}

const checkName = (name) => {
    if (!/(?=.*[a-z])(?=.*\s)/.test(name)){
        console.log(`You entered \"${name}\". Let's try again. This time, \n please enter both first and last name, divided by a space.`);
        return false
    } else {return true}
}

const getManager = () => {
    const mangRole = 'Manager';
    let mangName;
    let mangOffice;
    let mangEmail;
    let mangId;
    const manNameQuestion = [{type: 'input', message: 'Ok, let\'s build your team! We\'ll start with you. What\'s your name?', name: 'manager.name'}];
        inquirer.prompt(manNameQuestion)
        .then(nameAns =>{
            const name = nameAns.manager.name;
            if (checkName(name) === false){
                getManager();
                return
            } else {
                mangName = nameAns.manager.name;
                const getOfficeNumber = () =>{
                    const officeNumber = [{type: 'input', message: 'Please enter your office number:', name: 'manager.officeNumber'}];
                    inquirer.prompt(officeNumber).then(offAns => {
                        if(!/^(?=.*\d)(?!.*\W).*$/.test(offAns.manager.officeNumber)){
                            console.log(`You entered \"${offAns.manager.officeNumber}.\" \nYour answer needs to contain at least one number, \nand alphanumeric characters only.`);
                            getOfficeNumber();
                        } else {
                            mangOffice = offAns.manager.officeNumber;
                            console.log(`manager's office ${mangOffice}`); 
                            getEmployee();
                        }
                    })
                } 
                getOfficeNumber();
            }
        })
}

const start = () => {
    inquirer.prompt({type: 'confirm', message: 'By beginning this program, you assert \n that you are a manager. Are you a manager?', default: false, name: 'confirmAuth'}).then(ans => {
        if (ans.confirmAuth === false){
            console.log('You are not authorized to run this program. Please get the Manager.');
            return
        } else {
            getManager();
        }
    })
}

start();