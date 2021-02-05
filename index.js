// dependencies
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./config/connection");

connection.connect((err) => {
  if (err) throw err;
  start();
});
//starts inquirer prompts
const start = () => {
  inquirer
    .prompt({
      name: "prompts",
      type: "list",
      message: "Welcome to the employee database",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Update An Employee Role",
        "Add An Employee",
        "Add a Role",
        "Add a Department",
        "Finish",
      ],
    })
    .then((answer) => {
      switch (answer.prompts) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Departments":
          viewDept();
          break;
        case "Update An Employee Role":
          updateRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add a Departmet":
          addDept();
          break;
        case "Finish":
          connection.end();
          break;
      }
    });
};
// view list of all employees
const viewEmployees = () => {
  connection.query(`SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name As department,
    role.salary,
    concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON manager.id = employee.manager_id;`),
    (err, results) => {
      if (err) throw err;
      console.table(results);
      start();
    };
};
// view list of all roles
const viewRoles = () => {
    connection.query('SELECT * FROM role;', (err, results)=>{
        if(err) throw err;
        console.table(results);
        start();
    })
};
// view list of all departments
const viewDept = () => {
    connection.query('SELECT * FROM department;', (err, results)=>{
        if(err) throw err;
        console.table(results);
        start();
    })
};
// add an employee to the database
const addEmployee = () => {};
// add a new role to the database
const addRole = () => {};
// add a new department to the database
const addDept = () => {};
// update an current employees role
const updateRole = () => {};
