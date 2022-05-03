import { JWTapiClient } from '.';

const getBoxMemories = async boxSeq => {
  const result = await JWTapiClient.get(`box/${boxSeq}/memory`).then(
    res => res.data,
  );
  const memories = [];
  result.boxMemories.forEach(memory => {
    const tmp = {
      email: memory.userEmail,
      profile: memory.userProfileImage,
      nickname: memory.userBoxNickname,
    };
    if (memory.text != null) {
      memories.push({ ...tmp, value: memory.text, type: 1 });
    }
    if (memory.image.length > 0) {
      memory.image.forEach(item =>
        memories.push({ ...tmp, value: item, type: 2 }),
      );
    }
    if (memory.video.length > 0) {
      memory.video.forEach(item =>
        memories.push({ ...tmp, value: item, type: 3 }),
      );
    }
    if (memory.voice != null) {
      memories.push({ ...tmp, value: memory.voice, type: 4 });
    }
  });
  return {
    ...result.boxDetail,
    memories,
  };
};

const createMemoryBox = async data => {
  const result = await JWTapiClient.post('box/create', data).then(
    res => res.data,
  );
  return result;
};

export { getBoxMemories, createMemoryBox };
