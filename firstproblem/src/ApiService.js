import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ApiService {

  fetchStudents() {
    return axios.get(API_BASE_URL + '/student');
  }

  addStudent(studentEntity) {
    return axios.post(API_BASE_URL + '/student/', studentEntity);
  }

  deleteStudent(lStudentId) {
    return axios.delete(API_BASE_URL + '/student/' + lStudentId);
  }

  filterStudents(filterStudentEntity) {
    return axios.post(API_BASE_URL + '/student/search', filterStudentEntity);
  }

  fetchClasses() {
    return axios.get(API_BASE_URL + '/class');
  }

  addClass(classEntity) {
    return axios.post(API_BASE_URL + '/class/', classEntity);
  }

  deleteClass(lClassId) {
    return axios.delete(API_BASE_URL + '/class/' + lClassId);
  }
  
  filterClasses(filterClassEntity) {
    return axios.post(API_BASE_URL + '/class/search', filterClassEntity);
  }

}

export default new ApiService();