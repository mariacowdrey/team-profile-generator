const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// Inquirer prompt to determine employee type
let employeeArr = [];

const initialQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select type of employee.',
            name: 'employeeType',
            choices: [Manager, Engineer, Intern]
        },
    ])
        .then(answer => {
            console.log(answer);
            if (answer.employeeType === 'Manager') {
                managerQuestions();
            } else if
                (answer.employeeType === 'Engineer') {
                engineerQuestions();
            } else if
                (answer.employeeType === 'Intern') {
                internQuestions();
            }
            else {
                console.log('Done!');
                return;
            }
        })
}

initialQuestion();

const internQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: "Please enter name.",
            name: 'internName'
        },
        {
            type: 'input',
            message: "Please enter employee id.",
            name: 'id',
        },
        {
            type: 'input',
            message: "Please enter email.",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please enter school.",
            name: 'school',
        },
        {
            type: 'confirm',
            message: "Would you like to enter another employee?",
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.id, answers.email, answers.school);
            employeeArr.push(intern);

            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }
        })
}

const engineerQuestions = () => {
    inquirer.prompt([

        {
            type: 'input',
            message: "Please enter name.",
            name: 'engineerName'
        },
        {
            type: 'input',
            message: "Please enter employee id.",
            name: 'id',
        },
        {
            type: 'input',
            message: "Please enter email.",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please enter github username.",
            name: 'github',
        },
        {
            type: 'confirm',
            message: "Would you like to enter another employee?",
            name: 'addCheck',
        },

    ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github);
            employeeArr.push(engineer);

            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }
        })
}


const managerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "Please enter name.",
            name: 'managerName'
        },
        {
            type: 'input',
            message: "Please enter employee id.",
            name: 'id',
        },
        {
            type: 'input',
            message: "Please enter email.",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please enter office number.",
            name: 'officeNumber',
        },
        {
            type: 'confirm',
            message: 'Would you like to enter another employee?',
            name: 'addCheck',
        },

    ])
        .then(answers => {
            console.log(answers.managerName);

            const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
            employeeArr.push(manager);

            console.log(employeeArr);

            if (answers.addCheck) {
                initialQuestion();
            } else {
                let data = render(employeeArr);
                fs.writeFile(outputPath, data, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            }
           
        })
}
