import { loginApiInstance } from '.';
const JWTapiClient = loginApiInstance();

// 대기페이지 유저정보 가져오기
const getReadyUserAPI = async data => {
  const result = await JWTapiClient.get(`box/lock-ready/${data}`).then(
    res => res.data,
  );
  return result;
};
// 열기전페이지 유저정보 가져오기
const getOpenUserAPI = async data => {
  const result = await JWTapiClient.get(`box/unlock-ready/${data}`).then(
    res => res.data,
  );
  const user = result.openBoxReadyList.find(
    item => item.userSeq === result.userSeq,
  );
  return {
    ...result,
    isCome: user.boxUserIsCome,
  };
};
// 열기전페이지 유저상태 바꾸기
const changeOpenUserAPI = async data => {
  await JWTapiClient.put(`box/unlock-ready/${data}`);
};
// 방장, 대기페이지에서 유저 삭제
const deleteReadyUserAPI = async data => {
  await JWTapiClient.delete(`box/lock-ready/${data}`);
};
// 방장, 대기페이지에서 기억함 묻기
const lockMemoryBoxAPI = async data => {
  await JWTapiClient.put(`box/lock/${data}`);
};
// 방장, 열기전페이지에서 기억함 열기
const unlockMemoryBoxAPI = async data => {
  await JWTapiClient.put(`box/unlock/${data}`);
};

export {
  getReadyUserAPI,
  deleteReadyUserAPI,
  lockMemoryBoxAPI,
  getOpenUserAPI,
  unlockMemoryBoxAPI,
  changeOpenUserAPI,
};
