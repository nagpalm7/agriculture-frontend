import axios from 'axios';

export var axiosInstance = axios.create({
  baseURL: 'https://api.aflmonitoring.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
