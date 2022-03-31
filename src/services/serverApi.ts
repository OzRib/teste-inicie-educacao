import axios from 'axios';
import envNames from '@env';

const token = envNames.authorizationToken

const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  headers: {
    'Authorization': token ? `Bearer ${token}` : undefined
  }
});

export default api;
