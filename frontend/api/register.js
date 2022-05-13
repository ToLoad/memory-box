import Router from 'next/router';
import { loginApiInstance } from '.';
import { getBox } from './box';
import { lockMemoryBoxAPI } from './ready';

// JWTToken
const JWTapiClient = loginApiInstance();

// 기억들 저장
const saveMemoryBox = async ({
  apiBoxId,
  apiContent,
  apiImageUrl,
  apiNickname,
  apiVideoUrl,
  apiVoiceUrl,
  boxIsSolo,
}) => {
  const data = {
    content: apiContent,
    ...(apiImageUrl.length > 0 && { image: apiImageUrl }),
    nickname: apiNickname,
    ...(apiVideoUrl.length > 0 && { video: apiVideoUrl }),
    ...(apiVoiceUrl.length > 0 && { voice: apiVoiceUrl }),
  };
  const response = await JWTapiClient.put(`memory/${apiBoxId}`, data);
  if (boxIsSolo) {
    // 데이터 바로 보내주기
    lockMemoryBoxAPI(apiBoxId);
  }
  return response.data;
};

// 기억틀 생성
const getMemoryBox = async boxId => {
  const response = await JWTapiClient.get(`memory/${boxId}`).then(res => {
    return res.status;
  });
  let data = '';
  // 203 도 처리해주기
  if (response === 201 || response === 203 || response === 200) {
    data = getBox(boxId);
  } else if (response === 208) {
    // /mybox로 넘겨주기
    Router.push(`/ready/${boxId}`);
  }
  return data;
};

// 기억함 생성하기
const createMemoryBox = async data => {
  const result = await JWTapiClient.post('box/create', data).then(
    res => res.data,
  );
  return result;
};
export { saveMemoryBox, getMemoryBox, createMemoryBox };
