/* eslint-disable no-undef */
import axios from 'axios';
class SessionStorage {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  static setItem(key, item) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, item);
    }
  }

  static getItem(key) {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  }
}

// 로그인이 필요없는 요청에 사용하는 api
const apiClient = axios.create({
  baseURL: 'https://k6e201.p.ssafy.io/api/',
  // baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-type': 'application/json',
  },
});

// 로그인이 필요하기 때문에 jwt 토큰을 헤더에 함께 보내야하는 api
const JWTapiClient = axios.create({
  baseURL: 'https://k6e201.p.ssafy.io/api/',
  headers: {
    'Content-type': 'application/json',
    Authorization: `${SessionStorage.getItem('ACCESS_TOKEN')}`,
  },
});

const JWTapiFileClient = axios.create({
  baseURL: 'https://k6e201.p.ssafy.io/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `${SessionStorage.getItem('ACCESS_TOKEN')}`,
  },
});

export { JWTapiClient, apiClient, JWTapiFileClient };
