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
        message: '\033[35m  What would you like to do?',
        choices: ['\033[34m Update Employee Role',
          new inquirer.Separator(), '\033[35m View All Roles',
          new inquirer.Separator(), '\033[34m View All Employees',
          new inquirer.Separator(), '\033[35m View All Departments',
          new inquirer.Separator(), '\033[34m Add Department',
          new inquirer.Separator(), '\033[35m Add Role',
          new inquirer.Separator(), '\033[34m Add Employee',
          new inquirer.Separator(), '\033[35m\033[35m\x1b[5m Quit',
          new inquirer.Separator(), new inquirer.Separator(),]
      }
    ])
    .then((answers) => {
      switch (answers.selection) {
        case '\033[34m Update Employee Role':
          updateEmployeeRole();
          break;

        case '\033[34m Add Employee':
          addEmployee();
          break;

        case '\033[35m View All Roles':
          viewAllRoles();
          console.clear();
          console.log("(Move up and down to reveal more choices)")
          break;

        case '\033[35m Add Role':
          addRole();
          break;
        case '\033[35m View All Departments':
          viewAllDepartments();
          console.clear();
          console.log("(Move up and down to reveal more choices)")
          break;

        case '\033[34m Add Department':
          addDepartment();
          break;
        case '\033[34m View All Employees':
          viewAllEmployees();
          console.clear();
          console.log("(Move up and down to reveal more choices)")
          break;

        case '\033[35m\033[35m\x1b[5m Quit':
          console.log("Goodbye, please don't forget to clockout before going home this time Terry.")
          break;

        default:

          console.log("error.")
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
  departmentArray = []
  let roles = await db.promise().query('SELECT department.id, department.name FROM department;')
  choicesArray = roles[0]
  // console.log(roles)
  console.log(choicesArray)

  // for (let i = 0; i < choicesArray.length; i++) {
  //   const el = choicesArray[i];
  //   departmentArray.push(el)

  // }
  // console.log(departmentArray)
  return choicesArray
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
        type: 'number',
        name: 'salary',
        message: "What is this role's salary?",
      },
      {
        type: 'list',
        name: 'department',
        message: "What is this role's department?",
        choices: async () => { return await roleChoices(); }

      },
    ])

    //async
    .then((answers) => {
      (answers.title, answers.salary, answers.department)
      //db query to add this?
      console.log(answers.department)
      console.log(answers)
      db.query(`INSERT INTO role (title, salary, department_id)
       VALUES ('${answers.title}', ${answers.salary}, '${answers.department}');`)
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
        type: 'number',
        name: 'salary',
        message: "What is this role's salary?",
      },
      {
        type: 'list',
        name: 'department',
        message: "What is this employee's department?",
        choices: async () => { return await roleChoices(); }

      },
    ])
    .then((answers) => {
      (answers.first, answers.last, answers.title, answers.salary, answers.department)
      //db query to add this?
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, '${answers.department}');`)
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
      db.query(`INSERT INTO department (name) VALUES ('${answers.department}');`,)
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
        type: 'list',
        name: 'department',
        message: "What is this new department?",
        choices: async () => { return await roleChoices(); }
      },
    ])
    .then((answers) => {
      (answers.department)
      //db query needs to update employee, do i need to update more than one table?
      db.query(`UPDATE role (department_id) VALUES ('${answers.department}');`)
    }).then(() =>
      console.log("Updated role")
    ).then(() =>
      init()
    )
};


