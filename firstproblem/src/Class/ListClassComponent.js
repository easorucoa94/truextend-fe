import React, { Component } from 'react';
import ApiService from '../ApiService';

class ListClassComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      classList: []
    }
    this.reloadClassList = this.reloadClassList.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.addClass = this.addClass.bind(this);
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

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Class List</h2>
        <div className="text-center insertButtonBox">
          <button className="btn btn-primary" onClick={() => this.addClass()}>Insert Class</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">sClassCode</th>
              <th className="text-center">sClassTitle</th>
              <th className="text-center">sClassDescription</th>
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