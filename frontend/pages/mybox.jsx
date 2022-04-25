/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Box from '../components/mybox/Box';
import DetailBox from '../components/mybox/DetailBox';
import { Wrapper, MapContainer } from '../styles/variables';

export default function mybox() {
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

  return (
    <MapContainer>
      <Wrapper>
        {toggle ? (
          <DetailBox set={changeMode} click={click} />
        ) : (
          <Box set={changeMode} click={click} firstClick={firstClick} />
        )}
      </Wrapper>
    </MapContainer>
  );
}
