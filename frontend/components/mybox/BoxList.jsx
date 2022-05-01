/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import DetailBox from './DetailBox';
import Box from './Box';
// 박스별 정보다르게 추출
export default function BoxList(props) {
  const [toggle, setToggle] = useState(false);
  const [click, setNextToggle] = useState(true);
  function timer() {
    setTimeout(() => setToggle(!toggle), 1000);
  }
  // 닫힌함일때는 디테일 보여주기, 열린함의 경우 해당 박스 상세 내역 이동
  // 대기중인경우 대기 화면으로 이동
  function changeMode(num) {
    // 우측상단 버튼이 작동했을 때, 어디로 이동 할 것인가
    switch (num) {
      case 1:
        console.log('대기중인 기억함');

      case 2:
        // 닫힌 기억함
        if (toggle !== props.click) {
          props.setFirstClick(true);
          setNextToggle(!click);
          timer();
        }
      case 3:
        // 열린함
        console.log('열린함');
    }
  }

  function changeCategori() {
    switch (props.num) {
      case 2: {
        // all
        return (
          <>
            {toggle ? (
              <DetailBox
                boxInfo={props.boxInfo}
                set={changeMode}
                click={click}
                num={props.num}
                firstClick={props.firstClick}
              />
            ) : (
              <Box
                boxInfo={props.boxInfo}
                set={changeMode}
                click={click}
                firstClick={props.firstClick}
                num={props.num}
              />
            )}
          </>
        );
      }
      default:
        console.log(props.boxInfo, '넘겨받은박스정보');
        return (
          <Box
            boxInfo={props.boxInfo}
            num={props.num}
            click={props.click}
            set={changeMode}
          />
        );
    }
  }

  useEffect(() => {
    setNextToggle(true);
    setToggle(false);
  }, [props.num]);

  return <>{changeCategori()}</>;
}
