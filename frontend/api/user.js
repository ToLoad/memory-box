import { apiClient, loginApiInstance, RefapiClient, SessionStorage } from '.';
const JWTapiClient = loginApiInstance();
// ----------- 로그인
const postLogin = async code => {
  const response = await apiClient.post(`user/login`, code);
  return response.data;
};

// ----------- 로그아웃

const getLogout = async () => {
  const response = await RefapiClient.post(`user/logout`);

  return response.data;
};

// ------ 마이페이지

// 회원정보 수정
const postMyInfoChange = async imgUrl => {
  const response = await JWTapiClient.put(`user`, {
    imgUrl,
  });
  return response.data;
};
// 회원정보 조회
const getUserInfo = async () => {
  const access = SessionStorage.getItem('ACCESS_TOKEN ');
  console.log(access, 'api 요청에 들어오는 access token');
  const response = await JWTapiClient.get(`user`);
  console.log(response.data, '응답데이터');
  return response.data;
};

// 회원탈퇴
const deleteMyInfo = async () => {
  const response = await JWTapiClient.delete(`user`);
  return response.data;
};

// // 회원정보 전체 조회
// const getAllUserAdmin = async () => {
//   const response = await JWTapiClient.get(`user`);
//   return response.data;
// };

// 남은 기억함 갯수 확인
const getMybox = async userSeq => {
  const response = await JWTapiClient.get(`user/${userSeq}`);
  return response.data;
};

const refreshToken = async () => {
  const response = await RefapiClient.post(`user/refresh`);
  // .then(res => console.log(res, '결'))
  // .catch(err => console.log(err, '실'));

  return response.data;
};
//
export {
  postLogin,
  getLogout,
  postMyInfoChange,
  getUserInfo,
  deleteMyInfo,
  getMybox,
  refreshToken,
};
