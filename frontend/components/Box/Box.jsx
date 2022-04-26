import React from 'react';
import { BoxContainer, BoxContent, BoxHeader, BoxTextCard } from './Box.style';
import Masonry from '@mui/lab/Masonry';
const colors = [
  'white',
  'lightpink',
  'lightblue',
  'lightgreen',
  'lightcoral',
  'lightsalmon',
  'lightgray',
  'lightsteelblue',
  'lightyellow',
];
const datas = [
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 1,
    value: '미쳤다 싸피 6기 끝남? 😱 ㅠㅠ 취업 제일 먼저 한 사람 밥사주기 ㅎㅎ',
    color: 3,
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 2,
    value:
      'https://cdn.discordapp.com/attachments/928573149832941588/965401962680041513/unknown.png',
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 2,
    value:
      'https://cdn.discordapp.com/attachments/928573149832941588/966709748516925440/KakaoTalk_20220421_224358154.jpg',
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 2,
    value:
      'https://cdn.discordapp.com/attachments/928573149832941588/939910508629344276/20220207003254_1.jpg',
  },

  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 3,
    value: '동영상.MOV',
  },

  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 1,
    value:
      '꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 꾸러기수비대 최고 키키',
    color: 1,
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 1,
    value:
      '안녕 꾸러기 친구들아 지금 이글을 보고 있을때는 프로젝트가 끝났겠지? ㅎㅎ 고생많이 했고 약 1년동안 배우고 공부한 것들을 잘 준비해서 다들 원하는 곳에 취업했으면 좋겠다!! 플젝 같이 해서 즐거웠따🤍 -수민-',
    color: 2,
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 2,
    value:
      'https://media.discordapp.net/attachments/928573149832941588/943498728029958204/unknown.png?width=1430&height=669',
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 2,
    value: 'https://j.gifs.com/x68jLE.gif',
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 2,
    value:
      'https://cdn.discordapp.com/attachments/928573149832941588/944114519779708948/KakaoTalk_20220218_151115541.png',
  },
  {
    name: '황정민',
    profile: 'https://t1.daumcdn.net/cfile/tistory/99BFFF3D5F15776003',
    type: 1,
    value: '자율 프로젝트 고생했습니다! ',
    color: 0,
  },
];

export default function Box() {
  const showData = () => {
    const result = datas.map((data, i) => {
      if (data.type === 1) {
        return (
          <div key={i} className="box-content-card">
            <div className="box-content-card-user">
              <img src={data.profile} alt={data.name} />
            </div>
            <BoxTextCard className="card-text" color={colors[data.color]}>
              {data.value}
            </BoxTextCard>
          </div>
        );
      }
      if (data.type === 2) {
        return (
          <div key={i} className="box-content-card">
            <div className="box-content-card-user">
              <img src={data.profile} alt={data.name} />
            </div>
            <img src={data.value} alt="사진" />
          </div>
        );
      }
      return (
        <div key={i} className="box-content-card">
          <div className="box-content-card-user">
            <img src={data.profile} alt={data.name} />
          </div>
          <video controls>
            <source src={data.value} type="video/mp4" />
          </video>
        </div>
      );
    });
    return result;
  };
  return (
    <BoxContainer>
      <BoxHeader>
        <div className="box-title">자율 - 꾸러기수비대 모임</div>
        <div className="box-date">
          <div>🔒 2022.01.14 17시 00분</div>
          <div>🔑 2022.05.23 18시 00분</div>
        </div>
      </BoxHeader>
      <BoxContent>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={3}
          className="box-content"
        >
          {showData()}
        </Masonry>
      </BoxContent>
    </BoxContainer>
  );
}
