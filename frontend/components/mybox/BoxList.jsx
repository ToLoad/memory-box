/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import DetailBox from './DetailBox';
import Box from './Box';

export default function BoxList(props) {
  const [toggle, setToggle] = useState(false);
  const [click, setNextToggle] = useState(true);
  const [firstClick, setFirstClick] = useState(false);
  function timer() {
    setTimeout(() => setToggle(!toggle), 1000);
  }

  function changeMode() {
    if (toggle === click) {
      console.log('같아서 거부');
    } else {
      setFirstClick(true);
      setNextToggle(!click);
      timer();
    }
  }

  // 여기서 return 역시 카테고리별로 다르게 만들어 준다.
  // function RenderBoxList() {
  //   if (props.categori === 0) {
  //   } else if (props.categori === 1) {
  //   } else if (props.categori === 2) {
  //   } else if (props.categori === 3) {
  //   }
  // }

  return (
    <>
      {toggle ? (
        <DetailBox set={changeMode} click={click} />
      ) : (
        <Box set={changeMode} click={click} firstClick={firstClick} />
      )}
    </>
  );
}
