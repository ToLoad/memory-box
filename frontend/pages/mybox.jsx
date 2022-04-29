/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import Cartegori from '../components/mybox/Cartegori';
import BoxList from '../components/mybox/BoxList';
import { Wrapper, MapContainer } from '../styles/variables';
import { useQuery } from 'react-query';
import { getCloseBox, getOpenBox, getReadyBox } from '../api/box';
import Box from '../components/mybox/Box';

export default function mybox() {
  const [categori, setCategori] = useState(0);
  const [dataObj, setDataObj] = useState({});
  const [userData, setUserData] = useState({});
  const { data: close, isLoading: closeLD } = useQuery('closeBox', async () => {
    return getCloseBox();
  });
  const { data: ready, isLoading: readyLD } = useQuery('readyBox', async () => {
    return getReadyBox();
  });
  const { data: open, isLoading: openLD } = useQuery('openBox', async () => {
    return getOpenBox();
  });

  if (closeLD && readyLD && openLD) {
    return <>로딩즁</>;
  }

  const arr = [
    close,
    ready,
    [
      {
        boxSeq: 8,
        boxName: '동준이와 아이들',
        boxDescription: '동준이와 아이들의 소중한 추억',
        boxCreatedAt: '2022-04-28 14:23:23',
        boxOpenAt: '2022-09-25 13:00:00',
        boxLocName: '처음 만난 곳',
        boxLocLat: 35.175405,
        boxLocLng: 129.081282,
        boxLocAddress: '부산광역시 연제구 연산2동 822-126',
        user: [
          {
            boxSeq: 8,
            userSeq: 7,
            userEmail: 'qkrehdwns96@nate.com',
            userProfileImage:
              'http://k.kakaocdn.net/dn/bCFU73/btrAjoLW40a/qXmnK0NwRgdvrSMhe2nFkK/img_110x110.jpg',
          },
          {
            boxSeq: 8,
            userSeq: 9,
            userEmail: 'dmstjd3256@naver.com',
            userProfileImage:
              'http://k.kakaocdn.net/dn/bk4ZzT/btrxr5htg81/qieSPTQFVwiaPn0zjiJNB0/img_110x110.jpg',
          },
          {
            boxSeq: 8,
            userSeq: 8,
            userEmail: 'wltn1873@naver.com',
            userProfileImage:
              'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
          },
          {
            boxSeq: 8,
            userSeq: 10,
            userEmail: 'thgus7371@daum.net',
            userProfileImage:
              'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
          },
        ],
      },
      {
        boxSeq: 9,
        boxName: '동준이와 장소없음',
        boxDescription: '동준이 장소없는 모임',
        boxCreatedAt: '2022-04-28 14:23:55',
        boxOpenAt: '2022-09-25 13:00:00',
        boxLocName: null,
        boxLocLat: 0,
        boxLocLng: 0,
        boxLocAddress: null,
        user: [
          {
            boxSeq: 9,
            userSeq: 7,
            userEmail: 'qkrehdwns96@nate.com',
            userProfileImage:
              'http://k.kakaocdn.net/dn/bCFU73/btrAjoLW40a/qXmnK0NwRgdvrSMhe2nFkK/img_110x110.jpg',
          },
          {
            boxSeq: 9,
            userSeq: 9,
            userEmail: 'dmstjd3256@naver.com',
            userProfileImage:
              'http://k.kakaocdn.net/dn/bk4ZzT/btrxr5htg81/qieSPTQFVwiaPn0zjiJNB0/img_110x110.jpg',
          },
          {
            boxSeq: 9,
            userSeq: 8,
            userEmail: 'wltn1873@naver.com',
            userProfileImage:
              'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
          },
        ],
      },
    ],
    open,
  ];

  const ChangeBoxMode = num => {
    const boxdata = arr[num];
    if (num === 2) {
      return (
        <>
          {boxdata.map((value, idx) => {
            return <BoxList />;
          })}
        </>
      );
    } else {
      return (
        <>
          {/* boxInfo={value} */}
          {boxdata
            ? boxdata.map((value, idx) => {
                return <BoxList />;
              })
            : null}
        </>
      );
    }
  };

  function changreCartegori(num) {
    setCategori(num);
  }

  return (
    <MapContainer>
      <Wrapper>
        <Cartegori set={changreCartegori} cat={categori} />
        {ChangeBoxMode(categori)}
      </Wrapper>
    </MapContainer>
  );
}
