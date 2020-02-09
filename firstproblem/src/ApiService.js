import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ApiService {

  fetchStudents() {
    return axios.get(API_BASE_URL + '/student');
  }

  fetchClasses() {
    return axios.get(API_BASE_URL + '/class');
  }

}

export default new ApiService();