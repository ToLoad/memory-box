import { JWTapiClient } from '.';

// 이미지
const images = ['/image.gif', '/악어.gif', '/냥냥이.gif', '혼구리2.png'];

// progress percent 계산기
function getPercent(boxCreatedAt, boxOpenAt) {
  const StartDay = new Date(boxCreatedAt);
  const Dday = new Date(boxOpenAt);
  const today = new Date();
  const distance = Dday.getTime() - today.getTime();
  const totalDayLength = Dday.getTime() - StartDay.getTime();
  if (today.getTime() > Dday.getTime()) {
    return 100;
  }
  const leftDay = ((totalDayLength - distance) / totalDayLength) * 100;
  const leftDayPer = Math.floor(leftDay);
  return leftDayPer;
}

// 닫힌 기억함 조회
const getMainCloseBox = async () => {
  const response = await JWTapiClient.get(`box/close`, {});
  const result = response.data.map(res => {
    const Dday = new Date(res.boxOpenAt);
    const today = new Date();
    const distance = (Dday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    const hour = (distance % 1) * 24;
    const minute = (hour % 1) * 60;
    const nowPercent = getPercent(res.boxCreatedAt, res.boxOpenAt);
    // 퍼센트별로 이미지 변경
    let nowImage = 0;
    if (nowPercent < 25) {
      nowImage = 0;
    } else if (nowPercent <= 25 && nowPercent < 50) {
      nowImage = 1;
    } else if (nowPercent <= 50 && nowPercent < 75) {
      nowImage = 2;
    } else {
      nowImage = 3;
    }
    return {
      title: res.boxName,
      content: res.boxDescription,
      dDay: Math.floor(distance),
      dDayHour: Math.floor(hour),
      dDayMinute: Math.floor(minute),
      percent: nowPercent,
      imageSrc: images[0],
    };
  });
  return result;
};

// 기억들 저장
const saveMemorys = async (
  boxId,
  inputContent,
  imageUrl,
  inputNsickname,
  videoUrl,
  voiceUrl,
) => {
  const response = await JWTapiClient.post(`memory/${boxId}`, {
    content: inputContent,
    image: imageUrl,
    nickname: inputNsickname,
    video: videoUrl,
    voice: voiceUrl,
  });
  return response.data;
};

// 기억틀 생성
const getMemoryBox = async boxId => {
  const response = await JWTapiClient.get(`memory/${boxId}`);
  return response.data;
};

export { getMainCloseBox, saveMemorys };
