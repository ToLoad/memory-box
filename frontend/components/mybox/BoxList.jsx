/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import DetailBox from './DetailBox';
import Box from './Box';
// 박스별 정보다르게 추출
export default function BoxList(props) {
  const [mapInfo, setMapInfo] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [click, setNextToggle] = useState(true);
  const [firstClick, setFirstClick] = useState(false);
  function timer() {
    setTimeout(() => setToggle(!toggle), 1000);
  }
  // 닫힌함일때는 디테일 보여주기, 열린함의 경우 해당 박스 상세 내역 이동
  // 대기중인경우 대기 화면으로 이동
  function changeMode(num) {
    // 우측상단 버튼이 작동했을 때, 어디로 이동 할 것인가
    switch (num) {
      case 0:
        if (props.boxInfo.boxuserisdone) {
          console.log('기억함 묻기 대기화면으로 이동');
        } else {
          console.log('기억 담기 화면으로 이동');
        }
        break;
      case 1:
        console.log('대기중인 기억함');
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
        console.log('열린함');
        break;
      default:
        console.log('끝');
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
    // switch (props.num) {
    //   case 2: {
    // all
    return (
      <>
        {toggle ? (
          <DetailBox
            boxInfo={props.boxInfo}
            set={changeMode}
            click={click}
            num={props.num}
            firstClick={firstClick}
            nextToggle={() => nextToggle()}
            mapInfo={mapInfo}
          />
        ) : (
          <Box
            boxInfo={props.boxInfo}
            num={props.num}
            set={changeMode}
            click={click}
            firstClick={firstClick}
            nextToggle={() => nextToggle()}
          />
        )}
      </>
    );
    //   }
    //   default:
    //     // console.log(props.boxInfo, '넘겨받은박스정보');
    //     return (
    //       <Box
    //         boxInfo={props.boxInfo}
    //         num={props.num}
    //         click={props.click}
    //         set={changeMode}
    //       />
    //     );
    // }
  }

  useEffect(() => {
    setNextToggle(true);
    setToggle(false);
  }, [props.num]);

  return <>{changeCategori()}</>;
}
