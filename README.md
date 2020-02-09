# TRUEXTEND Coding Challenge

## Requested Position
Intermediate Java Software Engineer

## Personal Data
**Name**: Eduardo Andres Soruco Alderete

**Email**: easorucoa94@gmail.com

**Phone Number**: +591 70060600

## Scope
Having the following models:

- **Student** =  { lStudentId, sStudentFirstName, sStudentLastName }

- **Class** =  { lClassId, sClassCode, sClassTitle, sClassDescription }

Develop a **REST API** to run the following operations:

- Create/Edit/Delete Student.
- Create/Edit/Delete Class.
- Browse list of all Students.
- Browse list of all Classes.
- View all Students assigned to a Class.
- View all Classes assigned to a Student.
- Search Student/Classes by available fields/associations.

After that, develop a **FRONTEND APPLICATION** on which you can do the following:

- List of Students assigned to a Class
- Ability to add and delete a student and/or class
- Ability to search the info list

## Solution Details

This solution was built using ReactJS using scripts version 1.1.5, AJAX calls managed with AXIOS.

## Requirements

**BackEnd Aplication**: https://github.com/easorucoa94/firstProblemBE

You should have this running on **http://localhost:8080/** in order to this to work properly.

## Application endpoints
- **Path**: /student --- List all students (This contains its own filter form)

- **Path**: /add-student --- Add new student

- **Path**: /class --- List all classes (This contains its own filter form)

- **Path**: /add-class --- Add new class
