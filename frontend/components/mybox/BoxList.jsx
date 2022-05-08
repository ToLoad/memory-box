/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import DetailBox from './DetailBox';
import Box from './Box';
import { Route53RecoveryCluster } from 'aws-sdk';
import Router, { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { updateBoxUnlockReady } from '../../api/box';
// 박스별 정보다르게 추출
export default function BoxList(props) {
  const [mapInfo, setMapInfo] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [click, setNextToggle] = useState(true);
  const [firstClick, setFirstClick] = useState(false);
  function timer() {
    setTimeout(() => setToggle(!toggle), 1000);
  }

  const openready = useMutation(
    ['boxReady', props.boxInfo.boxId],
    async () => {
      return updateBoxUnlockReady(props.boxInfo.boxId);
    },
    {
      onSuccess: res => {
        console.log('오픈준비 성공');
        Router.push(`open/${props.boxInfo.boxId}`);
      },
      onError: err => {
        console.log('실패');
        if (err.response.status === 401) {
          Router.push(`login`);
        }
      },
    },
  );

  function switchingMode(num) {
    // 카테고리  4 : 숨김함에서 조회했을때의 카테고리
    if (props.categori === 4) {
      // 숨김함에서 조회를 했을 때는, 박스타입이 0 이다.
      // 이때는 상단의 버튼을 눌려도 작동해서는 안됨!
    } else {
      changeMode(num);
    }
  }

  // 닫힌함일때는 디테일 보여주기, 열린함의 경우 해당 박스 상세 내역 이동
  // 대기중인경우 대기 화면으로 이동
  function changeMode(num) {
    // 우측상단 버튼이 작동했을 때, 어디로 이동 할 것인가
    switch (num) {
      case 0:
        if (props.boxInfo.boxuserisdone) {
          Router.push(`ready/${props.boxInfo.boxId}`);
        } else {
          Router.push(`register/${props.boxInfo.boxId}`);
        }
        break;
      case 1:
        openready.mutate();
        // Router.push(`open/${props.boxInfo.boxId}`);
        break;
      case 2:
        // 닫힌 기억함
        if (toggle !== click) {
          setFirstClick(true);
          setNextToggle(!click);
          timer();
        }
        break;
      case 3:
        // 열린함
        Router.push(`box/${props.boxInfo.boxId}`);
        break;
      default:
    }
  }

  function nextToggle() {
    if (toggle !== click) {
      setFirstClick(true);
      setNextToggle(!click);
      timer();
    }
  }

  function MapLocation() {
    if (props.boxInfo.boxLocLat === 0 && props.boxInfo.boxLocLng === 0) {
      setMapInfo(false);
    }
  }
  useEffect(() => {
    setFirstClick(false);
  }, [props.categori]);

  useEffect(() => {
    MapLocation();
  }, []);

  function changeCategori() {
    return (
      <>
        {toggle ? (
          <DetailBox
            boxInfo={props.boxInfo}
            set={switchingMode}
            click={click}
            num={props.num}
            firstClick={firstClick}
            nextToggle={() => nextToggle()}
            mapInfo={mapInfo}
            categori={props.categori}
          />
        ) : (
          <Box
            boxInfo={props.boxInfo}
            num={props.num}
            set={switchingMode}
            click={click}
            firstClick={firstClick}
            nextToggle={() => nextToggle()}
            categori={props.categori}
          />
        )}
      </>
    );
  }

  useEffect(() => {
    setNextToggle(true);
    setToggle(false);
  }, [props.num]);

  return <>{changeCategori()}</>;
}
