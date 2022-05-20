import Router from 'next/router';
import { loginApiInstance } from '.';
import { getBox } from './box';
import { lockMemoryBoxAPI } from './ready';
import Swal from 'sweetalert2';

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
  const response = await JWTapiClient.get(`memory/${boxId}`)
    .then(res => {
      return res.status;
    })
    .catch(err => {
      // console.log('에러처리')
      if (err.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: '이미 진행중인 기억함입니다',
        });
        Router.push(`/main`);
      }
    });
  let data = '';
  // 203 도 처리해주기
  if (response === 201 || response === 203 || response === 200) {
    data = getBox(boxId);
  } else if (response === 204) {
    // 가지고 있는 기억함이 부족할 때
    Swal.fire({
      icon: 'error',
      title: '보유한 기억함 개수가 부족합니다',
    });
    Router.push(`/main`);
  } else if (response === 208) {
    // /mybox로 넘겨주기
    Router.push(`/ready/${boxId}`);
  }
  // else if (response === 403) {
  //   Swal.fire({
  //     icon: 'error',
  //     title: '이미 진행중인 기억함입니다',
  //   });
  //   Router.push(`/main`);
  // }
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
