init()
//prompt user to use command line
function init() {
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['Update Employee Role', new inquirer.Separator(), 'View All Roles', new inquirer.Separator(), 'Add Role', new inquirer.Separator(), 'View All Departments', new inquirer.Separator(), 'Add Department', new inquirer.Separator(), 'Quit']
      }
    ])

    //update these to have functions that reflect each possible answer
    .then((answers) => {
      switch (answers.selection) {
        case 'Engineer':
          engineerSelection();
          break;
        case 'Intern':
          internSelection();
          break;
        default:
          renderTeam()

      }
    })
}

    // .prompt([
    //   {
    //     type: 'input',
    //     name: 'name',
    //     message: 'What is your full name?',
    //   },

    //   {
    //     type: 'input',
    //     name: 'id',
    //     message: 'What is your employee ID number?',
    //   },

    //   {
    //     type: 'input',
    //     name: 'email',
    //     message: 'What is your email?',
    //   },

    //   {
    //     type: 'input',
    //     name: 'officeNumber',
    //     message: 'What is your office number?',
    //   },

    // ])
    // .then((answers) => {
    //   const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    //   teamMembers.push(manager)
    //   buildTeam()
    // }
    // )
// }