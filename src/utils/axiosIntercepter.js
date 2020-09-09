import axios from 'axios';

const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');

export const axiosInstance = axios.create({
  baseURL: 'https://api.aflmonitoring.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `token ${token}`,
  },
});
