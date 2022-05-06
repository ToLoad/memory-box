import React from 'react';
import { Wrapper } from '../../components/Slick/Slick.style';
import SlickOpen from '../../components/Slick/SlickOpen';

export default function open() {
  return (
    <Wrapper w="1000px">
      <div>
        <SlickOpen />
      </div>
    </Wrapper>
  );
}
