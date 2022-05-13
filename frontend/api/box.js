/* eslint-disable no-undef */
import { apiClient, loginApiInstance, JWTapiFileClient } from '.';
const JWTapiClient = loginApiInstance();
// 기억 함 관련 모든 요청 모음 추후 구분이 필요할 시 변경

// 기억함 상세

const getBox = async boxSeq => {
  const response = await apiClient.get(`box/detail/${boxSeq}`);
  return response.data;
};

// 닫힌 기억함 조회
const getCloseBox = async userSeq => {
  const response = await JWTapiClient.get(`box/close`, {});

  return response.data;
};

const getAllBox = async () => {
  const response = await JWTapiClient.get(`box/list`);

  return response.data;
};
// 열린 기억함 조회
// 기억함 열기 대기상태 조회
// 기억틀에 글로된 기억 담기

const getHideBox = async () => {
  const response = await JWTapiClient.get(`box/hide`);
  return response.data;
};

const putHideBox = async boxId => {
  const response = await JWTapiClient.put(`box/hide/${boxId}`);
  return response.data;
};

const putShowBox = async boxId => {
  const response = await JWTapiClient.put(`box/show/${boxId}`);
  return response.data;
};

export { getBox, getCloseBox, getAllBox, getHideBox, putHideBox, putShowBox };
