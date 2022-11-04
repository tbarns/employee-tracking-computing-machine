const inquirer = require('inquirer')
// where will i use this 
const mysql = require('mysql2')
require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ItXlD+xt8L#JHaGRF9',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

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



function viewAllEmployees() {
  console.log('view all employees')
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
  })

  init()
};

function viewAllRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
  })
  init()
};

function viewAllDepartments() {
  console.log('view all Department')
  // Query database 
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
  });

  init()
};


function addRole() {
  console.log('addROLE')
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "What is this role's title?",
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is this role's salary?",
      },
      {
        type: 'input',
        name: 'department',
        message: "What is this role's department?",
      },
    ])
    .then((answers) => {
      const role = new role(answers.title, answers.salary, answers.department)
      //db query to add this?
      db.query('INSERT `${role}` INTO roles', function (err) {


      }
      )})
      init()
    };



  function addDepartment() {
    console.log('add Department')
    init()
  };


  function updateEmployeeRole() {
    console.log('update employee role')
    init()
  };

  function quit() {
    console.log('quit')
    return;
  }
