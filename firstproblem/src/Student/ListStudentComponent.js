import React, { Component } from 'react';
import ApiService from '../ApiService';

class ListStudentComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      studentList: []
    }
    this.reloadStudentList = this.reloadStudentList.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.reloadStudentList();
  }

  reloadStudentList() {
    ApiService.fetchStudents()
      .then((res) => {
        this.setState({
          studentList: res.data
        })
      });
  }

  deleteStudent(lStudentId) {
    ApiService.deleteStudent(lStudentId)
      .then(res => {
        this.setState({
          studentList: this.state.studentList.filter(
            studentEntity => studentEntity.lstudentId !== lStudentId
          )
        })
      });
  }

  addStudent() {
    window.localStorage.removeItem("lStudentId");
    this.props.history.push('/add-student');
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Student List</h2>
        <div className="text-center insertButtonBox">
          <button className="btn btn-primary" onClick={() => this.addStudent()}>Insert Student</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">First Name</th>
              <th className="text-center">Last Name</th>
              <th className="text-center">Registered Classes</th>
              <th className="text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.studentList.map(
                studentEntity =>
                  <tr key={studentEntity.lstudentId}>
                    <td className="text-center">{studentEntity.sstudentFirstName}</td>
                    <td className="text-center">{studentEntity.sstudentLastName}</td>
                    <td className="text-center">
                    {
                      studentEntity.studentClasses.map(
                        classEntity =>
                          <p key={classEntity.lclassId}>{classEntity.sclassTitle}</p>
                      )
                    }
                    </td>
                    <td className="text-center">
                      <button className="btn btn-danger" onClick={() => this.deleteStudent(studentEntity.lstudentId)}>Delete</button>
                    </td>
                  </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ListStudentComponent;