const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const buildHTML = require('./util/generateHtml')
const https = require('https');
const fs = require('fs');

const team = [];
let dept;

const checkName = name => {
    if (!/(?=.*[a-z])(?=.*\s)/.test(name)){
        console.log(`   You entered \"${name}\". Let's try again. \n This time, please enter both first and last name, divided by a space.`);
        return false
    } else {return true}
}

const checkNum = ans => {
        if(!/^\d+$/.test(ans)){
            console.log(`   Please only enter numbers.`);
            return false;
        } else {return true}
}

const checkEmail = ans => {
    if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-_]+\.[A-Za-z0-9.-_]+$/.test(ans)){
        console.log(`   Please enter a valid email.`)
        return false
    } else {return true}
}

const employeeQuestions = [
    {
        name: 'name',
        type: 'input',
        message: 'Please enter first and last name, separated by a space:',
        validate: checkName
    },
    {
        name: 'id',
        type: 'input',
        message: 'Please enter employee ID number (numbers only):',
        validate: checkNum
    },
    {
        name: 'email',
        type: 'input',
        message: 'Please enter email:',
        validate: checkEmail
}]

const getEmployee = () => {
    inquirer.prompt({name: 'role', type: 'list', message: 'Please choose the employee\'s role:', choices: ['engineer', 'intern']}).then(roleAns=>{
        inquirer.prompt(employeeQuestions).then(empAns => {
            if (roleAns.role === 'engineer'){
                // console.log(`   engineer!`)
                let gitHub;
                const buildEng = () => {
                    const employee = new Engineer(empAns.name, empAns.id, empAns.email, gitHub);
                    team.push(employee);
                    // console.log(team);
                    inquirer.prompt({name: 'another', type: 'confirm', message: 'Would you like to add another team member?'}).then(ans => {
                        if (ans.another === true){
                        getEmployee();
                        } else {return};
                    })
                }
                const checkGitHub = async ans => {
                    https.get(`https://github.com/${ans}`, (res => {
                        if (res.statusCode === 200){
                            gitHub = ans
                            // console.log(`   true! ${gitHub}`);
                            buildEng();
                        } else {
                            console.log(`   You entered ${ans.github}, but that is not returning a valid GitHub page. Please check the username and try again.`);
                            getGitHub();
                        }
                    }))
                }
                const getGitHub = () =>{
                    inquirer.prompt({name: 'github', type: 'input', message: 'Please enter their GitHub username:'}).then(ans=>{
                        checkGitHub(ans.github)
                    })
                }
                getGitHub();
            } else {
                inquirer.prompt({name: 'school', type: 'input', message: 'Please enter the school or program the intern is attending:'}).then(ans=>{
                    const employee = new Intern(empAns.name, empAns.id, empAns.email, ans.school);
                    team.push(employee);
                    // console.log(team);
                    inquirer.prompt({name: 'another', type: 'confirm', message: 'Would you like to add another team member?'}).then(ans => {
                        if (ans.another === true){
                        getEmployee();
                        } else {
                            const htmlPage = buildHTML(team, dept);
                            fs.writeFile(`${dept}Team.html`, htmlPage, (err => {
                                if (err) {
                                    throw err;
                                } else { 
                                    console.log(`  written!`);
                                }
                            }))

                        }
                    })
                })
            }
        })
    })
}


const getManager = () => {
    let mangName;
    let mangOffice;
    let mangEmail;
    let mangId;
    const mangQuestion = [{type: 'input', message: 'What department are you in?', name: 'dept'}, {type: 'input', message: 'Ok, let\'s build your team! We\'ll start with you. Press ENTER to start entering YOUR information.', name: 'manager'}];
    inquirer.prompt(mangQuestion).then(ans =>{
        dept = ans.dept;
        inquirer.prompt(employeeQuestions).then(empAns=>{
            mangName = empAns.name;
            mangEmail = empAns.email;
            mangId = empAns.id;
            const getOfficeNumber = () =>{
                const officeNumber = [{type: 'input', message: 'Please enter your office number:', name: 'manager.officeNumber'}];
                inquirer.prompt(officeNumber).then(offAns => {
                    if(!/^(?=.*\d)(?!.*\W).*$/.test(offAns.manager.officeNumber)){
                        console.log(`You entered \"${offAns.manager.officeNumber}.\" \nYour answer needs to contain at least one number, \nand alphanumeric characters only.`);
                        getOfficeNumber();
                    } else {
                        mangOffice = offAns.manager.officeNumber;
                        const newMang = new Manager(mangName, mangId, mangEmail, mangOffice);
                        team.push(newMang);
                        // console.log(team);
                        console.log(`OK, now let's collect information about your team.`); 
                        getEmployee();
                    }
                })
            }  
            getOfficeNumber(); 
        })
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