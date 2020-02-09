import React, { Component } from 'react';
import ApiService from '../ApiService';

class ListClassComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      classList: []
    }
  }

  componentDidMount() {
    this.reloadClassList();
  }

  reloadClassList() {
    ApiService.fetchClasses()
      .then((res) => {
        this.setState({classList: res.data})
      });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Class List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">sClassCode</th>
              <th className="text-center">sClassTitle</th>
              <th className="text-center">sClassDescription</th>
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