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

  console.log(props);

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
