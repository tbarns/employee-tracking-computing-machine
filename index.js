const inquirer = require('inquirer')
const mysql = require('mysql2')



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

//calls my inquirer prompts
init()
//prompt user to use command line
function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['Update Employee Role',
          new inquirer.Separator(), 'View All Roles',
          new inquirer.Separator(), 'View All Employees',
          new inquirer.Separator(), 'View All Departments',
          new inquirer.Separator(), 'Add Department',
          new inquirer.Separator(), 'Add Role',
          new inquirer.Separator(), 'Add Employee',
          new inquirer.Separator(), 'Quit',
          new inquirer.Separator(), new inquirer.Separator(),]
      }
    ])
    .then((answers) => {
      switch (answers.selection) {
        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Add Employee':
          addEmployee();
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
          //this isnt qutting 
          console.log("Goodbye, please don't forget to clockout before going home this time Terry.")
          return;

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
  let choicesArray = []
  let roles = await db.promise().query('SELECT department.id, department.name FROM department;')
  choicesArray = roles[0]
  console.log(choicesArray)
  let choices = Object.values(choicesArray[1])
  console.log(choices)


//these are my conoslo logs

//each one is an object and i need to ge tthe values on each object but at indexc 1 of each object
// { id: 1, name: 'Accounting' },
// { id: 2, name: 'IT' },
// { id: 3, name: 'Sales' }
// ]
// [ 2, 'IT' ]



  // for (let i = 0; i < choices[1].length; i++) {
  //   const el = choices[i];
  //   choicesArray.push(el)

  // }

  // console.log(choicesArray)
  return choices;
}

function addRole() {

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
    ).then(() =>
      init()
    )
};


function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first',
        message: "What is this employee's first name?",
      },
      {
        type: 'input',
        name: 'last',
        message: "What is this employee's last name?",
      },
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
        type: 'list',
        name: 'department',
        message: "What is this employee's department?",
        choices: roleChoices()

      },
    ])
    .then((answers) => {
      (answers.first, answers.last, answers.title, answers.salary, answers.department)
      //db query to add this?
      db.query(`INSERT INTO roles VALUES (${answers.title}, ${answers.salary}, ${answers.department});`)
    }).then(() =>
      console.log("added employee")
    ).then(() =>
      init()
    )
}


function addDepartment() {
  inquirer
    .prompt([

      {
        type: 'input',
        name: 'department',
        message: "What is this new department?",

      },
    ])
    .then((answers) => {
      (answers.department)
      db.query(`INSERT INTO department(${answers.department});`,)
    }).then(() =>
      console.log("added department")
    ).then(() =>
      init()
    )
};


function updateEmployeeRole() {

  inquirer
    .prompt([

      {
        type: 'input',
        name: 'department',
        message: "What is this new department?",
      },
    ])
    .then((answers) => {
      (answers.department)
      //db query needs to update employee, do i need to update more than one table?
      db.query(`UPDATE role(${answers.department});`)
    }).then(() =>
      console.log("Updated role")
    ).then(() =>
      init()
    )
};


