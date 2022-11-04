DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);



CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
   FOREIGN KEY (role_id)
    REFERENCES employee(id)
    ON DELETE CASCADE
    -- this must be set to null if employee doesnt have a manager
    manager_id INT NULL
    --foreign key that refernces another employee that is the manager of this emplyee 
    --FOREIGN KEY (role_id)  CHANGE
    --REFERENCES employee(id)  CHANGE
    --ON DELETE CASCADE

);

