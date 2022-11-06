const inquirer = require('inquirer')
// where will i use this 
const mysql = require('mysql2')
// require('console.table');

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
    //make async
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
          console.log("Goodbye, please don't forget to clockout before going home this time Terry.")


      }
    })
}



function viewAllEmployees() {
  db.query('SELECT * FROM employee;', function (err, results) {
    console.log("\n");
    console.table(results);
  })

  init()
};

function viewAllRoles() {
  db.query('SELECT * FROM role;', function (err, results) {
    console.log("\n");
    console.table(results);
  })
  init()
};

function viewAllDepartments() {
  // Query database 
  db.query('SELECT * FROM department;', function (err, results) {
    console.log("\n");
    console.table(results);
  });

  init()
};


async function roleChoices() {

  let roles = await db.promise().query('SELECT department.id, department.name FROM department;')


  let choices = roles[0].map(({ id, name }) => ({
    value: id,
    name: name

  }))

  return choices;
}

function addRole() {

  inquirer
    .prompt([
      // {
      //   type: 'input',
      //   name: 'title',
      //   message: "What is this role's title?",
      // },
      // {
      //   type: 'input',
      //   name: 'salary',
      //   message: "What is this role's salary?",
      // },
      {
        type: 'list',
        name: 'department',
        message: "What is this role's department?",
        choices: roleChoices() 
        
      },
    ])

    //async
    .then((answers) => {
      (answers.title, answers.salary, answers.department)
      //db query to add this?
      db.query(`INSERT INTO roles VALUES (${answers.title}, ${answers.salary}, ${answers.department});`)
    }).then(() =>
      console.log("added role")
    ).then(()=>
    init()
    )
};



function addDepartment() {
  inquirer
    .prompt([

      {
        type: 'input',
        name: 'department',
        message: "What is this new department?",
        choices: ""
      },
    ])
    .then((answers) => {
      const department = new department(answers.department)
      //db query to add this?
      db.query('INSERT INTO department(`${department});', function (err) {

      }
      )
    })
  init()
};
//add employeefunction

function updateEmployeeRole() {

  //make this inquier promt match the needs for UPDATE
  inquirer
    .prompt([

      {
        type: 'input',
        name: 'department',
        message: "What is this new department?",
      },
    ])
    .then((answers) => {
      const department = new department(answers.department)
      //db query needs to update employee, do i need to update more than one table?
      db.query('UPDATE department(`${department});', function (err) {

      }
      )
    })





  init()
};


