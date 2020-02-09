import React, { Component } from 'react';
import ApiService from '../ApiService';

class ListStudentComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      studentList: []
    }
  }

  componentDidMount() {
    this.reloadStudentList();
  }

  reloadStudentList() {
    ApiService.fetchStudents()
      .then((res) => {
        this.setState({studentList: res.data})
      });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Student List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">sStudentFirstName</th>
              <th className="text-center">sStudentLastName</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.studentList.map(
                studentEntity =>
                  <tr key={studentEntity.lstudentId}>
                    <td className="text-center">{studentEntity.sstudentFirstName}</td>
                    <td className="text-center">{studentEntity.sstudentLastName}</td>
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