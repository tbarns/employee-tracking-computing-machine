const inquirer = require('inquirer')
// where will i use this 
const sql = require('mysql2')
require('console.table');



init()
//prompt user to use command line
function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['Update Employee Role', new inquirer.Separator(), 'View All Roles', new inquirer.Separator(), 'View All Employees', new inquirer.Separator(), 'View All Departments', new inquirer.Separator(), 'Add Department', new inquirer.Separator(), 'Add Role', new inquirer.Separator(), 'Quit', new inquirer.Separator(), new inquirer.Separator(),]
      }
    ])

    //update these to have functions that reflect each possible answer
    .then((answers) => {
      switch (answers.selection) {
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;

        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'Add Department':
          addDepartment();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'Quit':
          viewAllDepartments();
          break;

        default:
          //change to a quit function
          quit()

      }
    })
  }



function viewAllEmployees(){
  console.log('view all employees')
  init()
};

function updateEmployeeRole(){
  console.log('update employee role')
  init()
};

function viewAllRoles(){
  console.log('view all roles')
  init()
};

function addRole(){
  console.log('addROLE')
  init()
};

function viewAllDepartments(){
  console.log('view all Department')
  init()
};


function addDepartment(){
  console.log('add Department')
  init()
};


function quit(){
  console.log('quit')
  return;
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