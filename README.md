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

## Application endpoints
- **Path**: /student --- List all students

- **Path**: /add-student --- Add new student

- **Path**: / (POST REQUEST) --- Register / Insert a new Student and (OPTIONAL) assign them to a class (if the class does not exist it will create a new one)

**Body**: StudentEntity Object
```
{
    "studentClasses": [
        {
            "lclassId": 7, #If Id is not put on the classEntity Object, it will create a new class
            "sclassCode": "MAT-102",
            "sclassTitle": "Math2",
            "sclassDescription": "Learn maths2"
        }
    ],
    "studentFilteredClasses": null,
    "lstudentId": 4,
    "sstudentFirstName": "Alan",
    "sstudentLastName": "Saavedra"
}
```

**Reponse**: StudentEntity Object
```
{
    "studentClasses": [
        {
            "classFilteredStudents": null,
            "lclassId": 7,
            "sclassCode": "MAT-102",
            "sclassTitle": "Math2",
            "sclassDescription": "Learn maths2"
        }
    ],
    "studentFilteredClasses": null,
    "lstudentId": 4,
    "sstudentFirstName": "Alan",
    "sstudentLastName": "Saavedra"
}
```

- **Path**: /{sStudentId} (PUT REQUEST) --- Updates Student with ID equals {sStudentId}

**Body**: StudentEntity Object
```
{
	"sstudentFirstName": "Alan",
	"sstudentLastName": "Saavedra"
}
```

**Reponse**: StudentEntity Object
```
{
    "studentClasses": null,
    "studentFilteredClasses": null,
    "lstudentId": 4,
    "sstudentFirstName": "Alan",
    "sstudentLastName": "Saavedra"
}
```

- **Path**: /{sStudentId} (DELETE REQUEST) --- Deletes Student with ID equals {sStudentId}

**Body**: None

**Reponse**: None

- **Path**: /search (POST REQUEST) --- Filters Students based on properties or relationship between classes and students

**Body**: StudentEntity Object
```
{
	"sstudentFirstName": "A",
	"sstudentLastName": "",
	"studentFilteredClasses": [] #Array [1,2,3,4]
}
```

**Reponse**: Collection of StudentEntity Object
```
[
    {
        "studentClasses": [],
        "studentFilteredClasses": null,
        "lstudentId": 4,
        "sstudentFirstName": "Alan",
        "sstudentLastName": "Saavedra"
    },
    {
        "studentClasses": [],
        "studentFilteredClasses": null,
        "lstudentId": 6,
        "sstudentFirstName": "Adrian",
        "sstudentLastName": "Cuellar"
    }
]
```

### http://{SERVER_URL}:{SERVER_PORT}/class
- **Path**: / (GET REQUEST) --- List all classes

**Body**: none

**Reponse**: Collection of ClassEntity
```
[
    {
        "studentsInClass": [],
        "classFilteredStudents": null,
        "lclassId": 3,
        "sclassCode": "MAT-101",
        "sclassTitle": "Maths",
        "sclassDescription": "Learn maths"
    }
]
```

- **Path**: / (POST REQUEST) --- Register / Insert a new Class and (OPTIONAL) can assign students to it (if the student does not exist it will create a new one)

**Body**: ClassEntity Object
```
{
    "studentsInClass": [
    	{
		"lstudentId": 4, #If Id is not put on the classEntity Object, it will create a new student
    		"sstudentFirstName": "Alan",
    		"sstudentLastName": "Saavedra"
	}
    ],
    "classFilteredStudents": null,
    "sclassCode": "MAT-101",
    "sclassTitle": "Maths",
    "sclassDescription": "Learn maths"
}
```

**Reponse**: ClassEntity Object
```
{
	"studentsInClass": [
	    {
		"studentFilteredClasses": null,
		"lstudentId": 4,
		"sstudentFirstName": "Alan",
		"sstudentLastName": "Saavedra"
	    }
	],
	"classFilteredStudents": null,
	"lclassId": 3,
	"sclassCode": "MAT-101",
	"sclassTitle": "Maths",
	"sclassDescription": "Learn maths"
}
```

- **Path**: /{sClassId} (PUT REQUEST) --- Updates Class with ID equals {sClassId}

**Body**: ClassEntity Object
```
{
	"sclassCode": "EME101",
	"sclassDescription": "New desc",
	"sclassTitle": "New title"
}
```

**Reponse**: ClassEntity Object
```
{
    "studentsInClass": null,
    "classFilteredStudents": null,
    "lclassId": 3,
    "sclassCode": "EME101",
    "sclassTitle": "New title",
    "sclassDescription": "New desc"
}
```

- **Path**: /{sClassId} (DELETE REQUEST) --- Deletes Class with ID equals {sClassId}

**Body**: None

**Reponse**: None

- **Path**: /search (POST REQUEST) --- Filters Classes based on properties or relationship between classes and students

**Body**: ClassEntity Object
```
{
	"sclassCode": "EM",
	"sclassTitle": "tit",
	"sclassDescription": "desc",
	"classFilteredStudents": [] #Array [1,2,3,4]
}
```

**Reponse**: Collection of ClassEntity Object
```
[
    {
        "studentsInClass": [],
        "classFilteredStudents": null,
        "lclassId": 5,
        "sclassCode": "MAT-101",
        "sclassTitle": "Maths",
        "sclassDescription": "Learn maths"
    }
]
```
