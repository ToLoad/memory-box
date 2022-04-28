import { apiClient, JWTapiClient, JWTapiFileClient } from '.';

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
      memory.image.forEach(img =>
        memories.push({ ...tmp, value: img, type: 2 }),
      );
    }
    if (memory.video.length > 0) {
      memory.video.forEach(v => memories.push({ ...tmp, value: v, type: 3 }));
    }
  });
  return {
    ...result.boxDetail,
    memories,
  };
};

const createMemoryBox = async () => {
  const result = await JWTapiClient.get('box/create', {});
  return result;
};

export { getBoxMemories, createMemoryBox };
