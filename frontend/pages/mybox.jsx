/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Cartegori from '../components/mybox/Cartegori';
import BoxList from '../components/mybox/BoxList';
import { Wrapper, MapContainer } from '../styles/variables';
import { useMutation, useQuery } from 'react-query';
import { getCloseBox, getOpenBox, getReadyBox } from '../api/box';
import { getLogout } from '../api/user';

export default function mybox() {
  const [firstClick, setFirstClick] = useState(false);
  // const [click, setNextToggle] = useState(true);
  const [categori, setCategori] = useState(0);

  // const arr = [null, ready, close, open];
  const data = [
    {
      boxCreatedAt: '2022-02-01 13:00:00',
      boxDescription: '너와 나를 기억하는 기억함',
      boxId: 'o23zKwT',
      boxLocAddress: '부산광역시 연제구 연산2동 822-126',
      boxLocLat: 35.175405,
      boxLocLng: 129.081282,
      boxLocName: '처음 만난 곳',
      boxName: '우리를 기억함',
      boxOpenAt: '2022-09-25 13:00:00',
      boxType: 3,
      user: [
        {
          boxId: 'o23zKwT',
          userNickname: '박동탁',
          userProfileImage: 'https://xxx.kakao.co.kr/.../aaa.jpg',
          userSeq: 1,
        },
      ],
    },
    {
      boxCreatedAt: '2022-02-01 13:00:00',
      boxDescription: '너와 나를 기억하는 기억함',
      boxId: 'o23zKwT',
      boxLocAddress: '부산광역시 연제구 연산2동 822-126',
      boxLocLat: 35.175405,
      boxLocLng: 129.081282,
      boxLocName: '처음 만난 곳',
      boxName: '우리를 기억함',
      boxOpenAt: '2022-09-25 13:00:00',
      boxType: 1,
      user: [
        {
          boxId: 'o23zKwT',
          userNickname: '박동탁',
          userProfileImage: 'https://xxx.kakao.co.kr/.../aaa.jpg',
          userSeq: 1,
        },
      ],
    },
    {
      boxCreatedAt: '2022-02-01 13:00:00',
      boxDescription: '너와 나를 기억하는 기억함',
      boxId: 'o23zKwT',
      boxLocAddress: '부산광역시 연제구 연산2동 822-126',
      boxLocLat: 35.175405,
      boxLocLng: 129.081282,
      boxLocName: '처음 만난 곳',
      boxName: '우리를 기억함',
      boxOpenAt: '2022-09-25 13:00:00',
      boxType: 0,
      user: [
        {
          boxId: 'o23zKwT',
          userNickname: '박동탁',
          userProfileImage: 'https://xxx.kakao.co.kr/.../aaa.jpg',
          userSeq: 1,
        },
      ],
    },
    {
      boxCreatedAt: '2022-02-01 13:00:00',
      boxDescription: '너와 나를 기억하는 기억함',
      boxId: 'o23zKwT',
      boxLocAddress: '부산광역시 연제구 연산2동 822-126',
      boxLocLat: 35.175405,
      boxLocLng: 129.081282,
      boxLocName: '처음 만난 곳',
      boxName: '우리를 기억함',
      boxOpenAt: '2022-09-25 13:00:00',
      boxType: 1,
      user: [
        {
          boxId: 'o23zKwT',
          userNickname: '박동탁',
          userProfileImage: 'https://xxx.kakao.co.kr/.../aaa.jpg',
          userSeq: 1,
        },
      ],
    },
    {
      boxCreatedAt: '2022-02-01 13:00:00',
      boxDescription: '너와 나를 기억하는 기억함',
      boxId: 'o23zKwT',
      boxLocAddress: '부산광역시 연제구 연산2동 822-126',
      boxLocLat: 35.175405,
      boxLocLng: 129.081282,
      boxLocName: '처음 만난 곳',
      boxName: '우리를 기억함',
      boxOpenAt: '2022-09-25 13:00:00',
      boxType: 2,
      user: [
        {
          boxId: 'o23zKwT',
          userNickname: '박동탁',
          userProfileImage: 'https://xxx.kakao.co.kr/.../aaa.jpg',
          userSeq: 1,
        },
      ],
    },
  ];
  // console.log(data);
  const arr = [[], [], [], []];
  // console.log(arr, '배열');
  data.map((value, idx) => {
    arr[value.boxType].push(value);
  });
  const open = arr[3];
  const close = arr.slice(0, 3);
  const ChangeBoxMode = num => {
    const boxdata = arr[num];
    if (categori === 0) {
      return close.map(
        (value, idx) => {
          // if (!value) {
          //   return;
          // }
          // if (value !== (null || undefined)) {
          return (
            <>
              {value.map((v, i) => {
                // console.log(v.boxType, idx, '벨류');
                return (
                  <BoxList
                    boxInfo={v}
                    key={idx}
                    num={v.boxType}
                    firstClick={firstClick}
                    setFirstClick={setFirstClick}
                  />
                );
              })}
            </>
          );
        },
        // }
      );
    } else {
      return (
        <>
          {boxdata
            ? open.map((value, idx) => {
                if (value !== null) {
                  return (
                    <>
                      <BoxList
                        boxInfo={value}
                        key={idx}
                        num={value.boxType}
                        firstClick={firstClick}
                        setFirstClick={setFirstClick}
                      />
                    </>
                  );
                }
              })
            : null}
        </>
      );
    }
  };

  function changreCartegori(num) {
    setCategori(num);
    setFirstClick(false);
  }

  return (
    <MapContainer>
      <Wrapper>
        <Cartegori set={changreCartegori} cat={categori} />
        {ChangeBoxMode(categori)}
        <button
          onClick={() => {
            logout.mutate();
          }}
        >
          로그아웃
        </button>
      </Wrapper>
    </MapContainer>
  );
}

// const { data: close, isLoading: closeLD } = useQuery('closeBox', async () => {
//   return getCloseBox();
// });
// const { data: ready, isLoading: readyLD } = useQuery('readyBox', async () => {
//   return getReadyBox();
// });
// const { data: open, isLoading: openLD } = useQuery('openBox', async () => {
//   return getOpenBox();
// });

// const logout = useMutation(
//   'logout',
//   async () => {
//     return getLogout();
//   },
//   {
//     onSuccess: res => {
//       console.log(res, '로그아웃 성공');
//     },
//     onError: err => {
//       console.log(err, '로그아웃 실패');
//     },
//   },
// );

// if (closeLD && readyLD && openLD) {
//   console.log('로딩');
//   return <>로딩즁</>;
// }

// const logout = useMutation(
//   'logout',
//   async () => {
//     return getLogout();
//   },
//   {
//     onSuccess: res => {
//       console.log(res, '로그아웃 성공');
//     },
//     onError: err => {
//       console.log(err, '로그아웃 실패');
//     },
//   },
// );
