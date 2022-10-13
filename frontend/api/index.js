/* eslint-disable no-undef */
import axios from 'axios';
export class SessionStorage {
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
  baseURL: 'https://memory-box.kr/api/',
  // baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-type': 'application/json',
  },
});

// 로그인이 필요하기 때문에 jwt 토큰을 헤더에 함께 보내야하는 api
function loginApiInstance() {
  const JWTapiClient = axios.create({
    baseURL: 'https://memory-box.kr/api/',
    headers: {
      'Content-type': 'application/json',
      Authorization: `${SessionStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
  return JWTapiClient;
}

// 로그아웃, 리프레쉬 재요청, 회원탈퇴
const RefapiClient = axios.create({
  baseURL: 'https://memory-box.kr/api/',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${SessionStorage.getItem('ACCESS_TOKEN')}`,
    // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3MgVG9rZW4iLCJ1c2VyU2VxIjo2LCJleHAiOjE2NTE1NjUxMzksImlzcyI6Ik1lbW9yeSBCb3gifQ.8TP8WfU9U7VPsp_h3FrgRkcMCNuSe1rHofT8Jau714ySYgIY7Glm8XZEL1dQMN0GzPSMpnTnlySTeOI3z9i9tQ`,
    Refresh: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzc2FmeS5jb20iLCJleHAiOjE2NDkzNTUyODgsImlhdCI6MTY0ODA1OTI4OH0.qR-pNROpbecwq2ag7uomVdqJMfhqsLIgguJVxaxWQgCIOIdoDXRmI6SVHTz1NYUcAv3GP4exLy1TZCPKQazYSQ`,
  },
});

const JWTapiFileClient = axios.create({
  baseURL: 'https://memory-box.kr/api/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `${SessionStorage.getItem('ACCESS_TOKEN')}`,
  },
});

export { loginApiInstance, apiClient, JWTapiFileClient, RefapiClient };
