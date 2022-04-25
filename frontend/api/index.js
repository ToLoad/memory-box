/* eslint-disable no-undef */
import axios from 'axios';

// 로그인이 필요없는 요청에 사용하는 api
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
  },
});

// 로그인이 필요하기 때문에 jwt 토큰을 헤더에 함께 보내야하는 api
const JWTapiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  },
});

const JWTapiFileClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  },
});

export { JWTapiClient, apiClient, JWTapiFileClient };
