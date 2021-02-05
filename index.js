// dependencies
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { start } = require('repl');
// this creates a connection to the local mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
});
// starts the connection
connection.connect((err) =>{
    if(err) throw err;
    start();
});
//starts inquirer prompts
const start=()=>{}
// view list of all employees
const viewEmployees=()=>{}
// view list of all roles
const viewRoles=()=>{}
// view list of all departments
const viewDept=()=>{}
// add an employee to the database
const addEmployee=()=>{}
// add a new role to the database
const addRole=()=>{}
// add a new department to the database
const addDept=()=>{}
// update an current employees role
const updateRole=()=>{}