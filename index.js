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
  connection.query(
    `SELECT concat(first_name,' ',last_name) as EmployeeName FROM employee;`,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
};
// view list of all roles
const viewRoles = () => {
  connection.query("SELECT * FROM role;", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};
// view list of all departments
const viewDept = () => {
  connection.query("SELECT * FROM department;", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};
// add an employee to the database
const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, roleInfo) => {
    connection.query("SELECT * FROM employee", (err, empData) => {
      if (err) throw err;
      const employeeName = empData.map(({ first_name, last_name }) => {
        return first_name + " " + last_name;
      });
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "Please enter the first name of your new employee",
          },
          {
            name: "lastName",
            type: "input",
            message: "Please enter the last name of your new employee",
          },
          {
            name: "role",
            type: "list",
            message: "Please select an available role for your new employee",
            choices: roleInfo.map(({ title }) => title),
          },
          {
            name: "manager",
            type: "list",
            message: "Please select an available manager for your new employee",
            choices: employeeName,
          },
        ])
        .then((answer) => {
          var { id } = roleInfo.find(({ title }) => title === answer.role);
          const roleId = id;
          var { id } = empData.find(
            ({ first_name, last_name }) =>
              first_name + " " + last_name === answer.manager
          );
          const managerId = id;
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: roleId,
              manager_Id: managerId,
            },
            (err) => {
              if (err) throw err;
              console.log("New employee added to the database");
              start();
            }
          );
        });
    });
  });
};
// add a new role to the database
const addRole = () => {
    connection.query('select * FROM department', (err, results)=>{
        if(err) throw err;
        inquirer.prompt([
            {
                name: 'roleTitle',
                type: 'input',
                message: 'Please enter a title for your new role'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Please enter the desired salary for your new role'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Please select the department this role belongs to',
                choices: results.map(({name})=>name)
            }
        ]).then((answer)=>{
            const {id} = results.find(({name})=>name===answer.department);
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.roleTitle,
                    salary: answer.salary,
                    dept_id: id
                },
                (err)=>{
                    if(err) throw err;
                    console.log('New role added to the database');
                    start();
                }
            );
        });
    })
};
// add a new department to the database
const addDept = () => {};
// update an current employees role
const updateRole = () => {};
