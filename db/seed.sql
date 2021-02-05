USE employee_db;

INSERT INTO department(name)
VALUES
    ('tank'),
    ('rogue'),
    ('mage'),
    ('shamen');

INSERT INTO role(title, salary, dept_id)
VALUES 
    ('Leader', 100000.00,1),
    ('Second', 50000.00,1),  
    ('Third', 40000.00,1),
    ('fourth', 2000.00,1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ('Henry', 'Jung',1,NULL),
    ('Jon', 'Jones',2,1),
    ('Han', 'Solo',3,2),
    ('Princess', "Leia",4,3);