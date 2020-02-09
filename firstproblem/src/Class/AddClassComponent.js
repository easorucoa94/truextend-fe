import React, { Component } from 'react';
import ApiService from '../ApiService';

class AddClassComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classEntity: {
        sclassCode: '',
        sclassTitle: '',
        sclassDescription: ''
      }
    };
    this.saveClassEntity = this.saveClassEntity.bind(this);
    this.onChangeClassProperty = this.onChangeClassProperty.bind(this);
  }

  onChangeClassProperty = (event) => {
    let classEntity = this.state.classEntity;
    classEntity[event.target.name] = event.target.value;
    this.setState({
      classEntity: classEntity
    });
  }

  saveClassEntity = (event) => {
    event.preventDefault();
    const classEntity = this.state.classEntity;
    ApiService.addClass(classEntity)
      .then(res => {
          this.props.history.push('/class');
      });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Register Class</h2>
        <form>
          <div className="form-group">
              <label>Code:</label>
              <input type="text" placeholder="Class's Code" name="sclassCode" className="form-control" value={this.state.classEntity.sclassCode} onChange={this.onChangeClassProperty}/>
          </div>

          <div className="form-group">
              <label>Title:</label>
              <input placeholder="Class's Title" name="sclassTitle" className="form-control" value={this.state.classEntity.sclassTitle} onChange={this.onChangeClassProperty}/>
          </div>

          <div className="form-group">
              <label>Description:</label>
              <input placeholder="Class's Description" name="sclassDescription" className="form-control" value={this.state.classEntity.sclassDescription} onChange={this.onChangeClassProperty}/>
          </div>
          <button className="btn btn-success" onClick={this.saveClassEntity}>Save</button>
        </form>
      </div>
    )
  }
}

export default AddClassComponent;