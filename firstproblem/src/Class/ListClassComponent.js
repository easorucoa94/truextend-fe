import React, { Component } from 'react';
import ApiService from '../ApiService';

class ListClassComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      classList: [],
      filterClassEntity: {
        "sclassCode": "",
        "sclassTitle": "",
        "sclassDescription": "",
        "classFilteredStudents": []
      }
    }
    this.reloadClassList = this.reloadClassList.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.addClass = this.addClass.bind(this);
    this.onChangeClassFilter = this.onChangeClassFilter.bind(this);
    this.filterClassEntity = this.filterClassEntity.bind(this);
  }

  componentDidMount() {
    this.reloadClassList();
  }

  reloadClassList() {
    ApiService.fetchClasses()
      .then((res) => {
        this.setState({
          classList: res.data
        })
      });
  }

  deleteClass(lClassId) {
    ApiService.deleteClass(lClassId)
      .then(res => {
        this.setState({
          classList: this.state.classList.filter(
            classEntity => classEntity.lclassId !== lClassId
          )
        })
      });
  }

  addClass() {
    window.localStorage.removeItem("lClassId");
    this.props.history.push('/add-class');
  }

  onChangeClassFilter = (event) => {
    let filterClassEntity = this.state.filterClassEntity;
    filterClassEntity[event.target.name] = event.target.value;
    this.setState({
      filterClassEntity: filterClassEntity
    });
  }

  filterClassEntity = (event) => {
    event.preventDefault();
    ApiService.filterClasses(this.state.filterClassEntity)
      .then(res => {
        this.setState({
          classList: res.data
        })
      });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Class List</h2>
        <div className="text-center insertButtonBox">
          <button className="btn btn-primary" onClick={() => this.addClass()}>Insert Class</button>
        </div>
        <form>
          <div className="row">
            <div className="col-4 form-group">
                <label>Code:</label>
                <input type="text" placeholder="Class's Code" name="sclassCode" className="form-control" value={this.state.filterClassEntity.sclassCode} onChange={this.onChangeClassFilter}/>
            </div>
            <div className="col-4 form-group">
                <label>Title:</label>
                <input type="text" placeholder="Class's Title" name="sclassTitle" className="form-control" value={this.state.filterClassEntity.sclassTitle} onChange={this.onChangeClassFilter}/>
            </div>
            <div className="col-4 form-group">
              <label>Description:</label>
              <input type="text" placeholder="Class's Description" name="sclassDescription" className="form-control" value={this.state.filterClassEntity.sclassDescription} onChange={this.onChangeClassFilter}/>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-right filterButtonBox">
              <button className="btn btn-info" onClick={this.filterClassEntity}>Filter</button>
            </div>
          </div>
        </form>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">Code</th>
              <th className="text-center">Title</th>
              <th className="text-center">Description</th>
              <th className="text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.classList.map(
                classEntity =>
                  <tr key={classEntity.lclassId}>
                    <td className="text-center">{classEntity.sclassCode}</td>
                    <td className="text-center">{classEntity.sclassTitle}</td>
                    <td className="text-center">{classEntity.sclassDescription}</td>
                    <td className="text-center">
                      <button className="btn btn-danger" onClick={() => this.deleteClass(classEntity.lclassId)}>Delete</button>
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

export default ListClassComponent;