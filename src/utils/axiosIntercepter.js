import axios from 'axios';

let token;

if (localStorage.getItem('Token')) {
  token = localStorage.getItem('Token');
} else if (sessionStorage.getItem('Token')) {
  token = sessionStorage.getItem('Token');
}

export const axiosInstance = axios.create({
  baseURL: 'https://api.aflmonitoring.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `token ${token}`,
  },
});
