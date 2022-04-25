/* eslint-disable no-undef */
import { apiClient, JWTapiClient, JWTapiFileClient } from '.';

// 기억 함 관련 모든 요청 모음 추후 구분이 필요할 시 변경

// -------------- 기억함 조회

// 기억함 전체 조회
const getAllBox = async userSeq => {
  const response = await JWTapiClient.get(`box/${userSeq}`, {});

  return response.data;
};

// 기억함 상세 조회
const getDetailBox = async boxSeq => {
  const response = await JWTapiClient.get(`box/${boxSeq}`);

  return response.data;
};

// --------------기억함 조림

// 기억함 정보 저장
const postSaveBoxInfo = async () => {
  const response = await apiClient.post('box/create', {});

  return response.data;
};

// 기억함 위치 저장
const postBoxLocation = async () => {
  const response = await apiClient.post('box/location', {});

  return response.data;
};

// --------------기억함 열기
// 기억함 열기 대기상태 조회

const getBoxUnlockReady = async () => {
  const response = await apiClient.get(`box/unlock-ready/${boxSeq}`);

  return response.data;
};

// 기억함 열기 대기 상태 변경
const updateBoxUnlockReady = async () => {
  const response = await apiClient.put(`box/unlock-ready/${boxUserSeq}`);

  return response.data;
};

// --------------기억 담기

// 기억함에 새 사용자 기억 틀 생성
const postBoxCreate = async () => {
  const response = await JWTapiClient.post(`memory/${boxSeq}`, {});

  return response.data;
};

// 기억틀에 글로된 기억 담기
const postTextMemory = async () => {
  const response = await JWTapiClient.post(`memory/text`);

  return response.data;
};

// 기억틀에 사진으로 된 기억 담기
const postImgMemory = async () => {
  const response = await JWTapiFileClient.post(`memory/image`);

  return response.data;
};

const getLockReady = async () => {
  const response = await apiClient.get(`box/lock-ready/${boxSeq}`);
  return response.data;
};

const updateLockReady = async () => {
  const response = await JWTapiClient.put(`box/lock-ready/${boxUserSeq}`);
  return response.data;
};

// 기억함 묻기 준비상태 조회

// 기억함 묻기 준비상태 변경

export {
  getAllBox,
  getDetailBox,
  postSaveBoxInfo,
  postBoxLocation,
  getBoxUnlockReady,
  updateBoxUnlockReady,
  postBoxCreate,
  postTextMemory,
  postImgMemory,
  getLockReady,
  updateLockReady,
};
