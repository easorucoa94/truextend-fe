import React, { Component } from 'react';
import ApiService from '../ApiService';

class ListStudentComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      studentList: [],
      classList: [],
      filterStudentEntity: {
        sstudentFirstName: '',
        sstudentLastName: '',
        studentFilteredClasses: []
      }
    }
    this.reloadStudentList = this.reloadStudentList.bind(this);
    this.reloadClassList = this.reloadClassList.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.filterStudentEntity = this.filterStudentEntity.bind(this);
    this.onChangeStudentFilter = this.onChangeStudentFilter.bind(this);
    this.getSelectedClasses = this.getSelectedClasses.bind(this);
  }

  componentDidMount() {
    this.reloadStudentList();
    this.reloadClassList();
  }

  reloadStudentList() {
    ApiService.fetchStudents()
      .then((res) => {
        this.setState({
          studentList: res.data
        })
      });
  }

  reloadClassList() {
    ApiService.fetchClasses()
      .then((res) => {
        for (let arrIndex = 0; arrIndex < res.data.length; arrIndex++) {
          const classEntity = res.data[arrIndex];
          classEntity.studentsInClass = null;
          classEntity.classFilteredStudents = null;
        }        
        this.setState({
          classList: res.data
        });
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

  onChangeStudentFilter = (event) => {
    let filterStudentEntity = this.state.filterStudentEntity;
    filterStudentEntity[event.target.name] = event.target.value;
    this.setState({
      filterStudentEntity: filterStudentEntity
    });
  }

  filterStudentEntity = (event) => {
    event.preventDefault();
    ApiService.filterStudents(this.state.filterStudentEntity)
      .then(res => {
        this.setState({
          studentList: res.data
        })
      });
  }

  getSelectedClasses = (event) => {
    const selectedClasses = Array.from(event.target.selectedOptions, option => option.value);
    let selectedClassEntityList = [],
    filterStudentEntity = this.state.filterStudentEntity;
    for (let arrIndex = 0; arrIndex < selectedClasses.length; arrIndex++) {
      const classIndex = selectedClasses[arrIndex];
      selectedClassEntityList.push(this.state.classList[classIndex].lclassId);
    }
    filterStudentEntity.studentFilteredClasses = selectedClassEntityList;
    this.setState({
      filterStudentEntity: filterStudentEntity
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Student List</h2>
        <div className="text-center insertButtonBox">
          <button className="btn btn-primary" onClick={() => this.addStudent()}>Insert Student</button>
        </div>
        <form>
          <div className="row">
            <div className="col-4 form-group">
                <label>First Name:</label>
                <input type="text" placeholder="Student's First Name" name="sstudentFirstName" className="form-control" value={this.state.filterStudentEntity.sstudentFirstName} onChange={this.onChangeStudentFilter}/>
            </div>
            <div className="col-4 form-group">
                <label>Last Name:</label>
                <input type="text" placeholder="Student's Last Name" name="sstudentLastName" className="form-control" value={this.state.filterStudentEntity.sstudentLastName} onChange={this.onChangeStudentFilter}/>
            </div>
            <div className="col-4 form-group">
              <label>Assigned Classes:</label>
              <select multiple className="form-control" name="studentClasses" onChange={this.getSelectedClasses}>
              {
                this.state.classList.map(
                  (classEntity, index) =>
                    <option value={index} key={classEntity.lclassId}>
                      {classEntity.sclassTitle}
                    </option>
                )
              }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-right filterButtonBox">
              <button className="btn btn-info" onClick={this.filterStudentEntity}>Filter</button>
            </div>
          </div>
        </form>
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