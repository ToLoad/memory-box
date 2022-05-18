import { apiClient, loginApiInstance, JWTapiFileClient } from '.';
const JWTapiClient = loginApiInstance();

// 보물 리스트 가져오기
const getTreasure = async () => {
  const response = await JWTapiClient.get(`treasure`);
  return response.data;
};

// 보물 찾았을 때 
const postTreasure = async treasureSeq => {
  const response = await JWTapiClient.post(`treasure`, {
    treasureSeq
  });
  return response.data;
};

// 보물 장소 추가
const addTreasuer = async () => {
  const response = await JWTapiClient.post(`treasuer/register`);
  return response.data;
};

export { getTreasure, postTreasure, addTreasuer };
