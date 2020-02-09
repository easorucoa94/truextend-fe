import React, { Component } from 'react';
import ApiService from '../ApiService';

class AddStudentComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentEntity: {
        sstudentFirstName: '',
        sstudentLastName: '',
        studentClasses: []
      },
      classList: []
    };
    this.saveStudentEntity = this.saveStudentEntity.bind(this);
    this.getSelectedClasses = this.getSelectedClasses.bind(this);
    this.onChangeStudentProperty = this.onChangeStudentProperty.bind(this);
    this.reloadClassList = this.reloadClassList.bind(this);
  }

  componentDidMount() {
    this.reloadClassList();
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
          studentEntity: this.state.studentEntity,
          classList: res.data
        });
      });
  }

  onChangeStudentProperty = (event) => {
    let studentEntity = this.state.studentEntity;
    studentEntity[event.target.name] = event.target.value;
    this.setState({
      studentEntity: studentEntity
    });
  }

  getSelectedClasses = (event) => {
    const selectedClasses = Array.from(event.target.selectedOptions, option => option.value);
    let selectedClassEntityList = [],
      studentEntity = this.state.studentEntity;
    for (let arrIndex = 0; arrIndex < selectedClasses.length; arrIndex++) {
      const classIndex = selectedClasses[arrIndex];
      selectedClassEntityList.push(this.state.classList[classIndex]);
    }
    studentEntity.studentClasses = selectedClassEntityList;
    this.setState({
      studentEntity: studentEntity
    });
  }

  saveStudentEntity = (event) => {
    event.preventDefault();
    const studentEntity = this.state.studentEntity;
    ApiService.addStudent(studentEntity)
      .then(res => {
          this.props.history.push('/student');
      });
  }

  render() {
    return (
      <div className="container">
      <h2 className="text-center">Register Student</h2>
      <form>
        <div className="form-group">
            <label>First Name:</label>
            <input type="text" placeholder="Student's First Name" name="sstudentFirstName" className="form-control" value={this.state.studentEntity.sstudentFirstName} onChange={this.onChangeStudentProperty}/>
        </div>

        <div className="form-group">
            <label>Last Name:</label>
            <input placeholder="Student's Last Name" name="sstudentLastName" className="form-control" value={this.state.studentEntity.sstudentLastName} onChange={this.onChangeStudentProperty}/>
        </div>

        <div className="form-group">
          <label>Assign Classes to Student</label>
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
      <button className="btn btn-success" onClick={this.saveStudentEntity}>Save</button>
  </form>
</div>
    )
  }
}

export default AddStudentComponent;