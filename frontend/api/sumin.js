import { loginApiInstance } from '.';
const JWTapiClient = loginApiInstance();
// 기억함 상세정보 가져오기
const getBoxMemoriesAPI = async boxSeq => {
  const result = await JWTapiClient.get(`box/${boxSeq}/memory`).then(
    res => res.data,
  );
  const memories = [];
  let cnt = 0;
  result.boxMemories.forEach(memory => {
    const tmp = {
      email: memory.userEmail,
      profile: memory.userProfileImage,
      nickname: memory.userBoxNickname,
    };
    if (memory.text != null) {
      memories.push({ ...tmp, value: memory.text, type: 1, color: (cnt += 1) });
    }
    if (memory.image.length > 0) {
      memory.image.forEach(item =>
        memories.push({ ...tmp, value: item, type: 2, color: 0 }),
      );
    }
    if (memory.video.length > 0) {
      memory.video.forEach(item =>
        memories.push({ ...tmp, value: item, type: 3, color: 0 }),
      );
    }
    if (memory.voice != null) {
      memories.push({ ...tmp, value: memory.voice, type: 4, color: 0 });
    }
  });
  const shuffle = array => {
    array.sort(() => Math.random() - 0.5);
  };
  shuffle(memories);
  return {
    ...result.memoriesBoxDetailBean,
    memories,
  };
};
// 기억함 생성하기
const createMemoryBoxAPI = async data => {
  const result = await JWTapiClient.post('box/create', data).then(
    res => res.data,
  );
  return result;
};
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
  getBoxMemoriesAPI,
  createMemoryBoxAPI,
  getReadyUserAPI,
  deleteReadyUserAPI,
  lockMemoryBoxAPI,
  getOpenUserAPI,
  unlockMemoryBoxAPI,
  changeOpenUserAPI,
};
