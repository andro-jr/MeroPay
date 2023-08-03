import axios from 'axios';

const client = axios.create({
  baseURL: 'htttp://localhost:8000/api',
});

export default client;
