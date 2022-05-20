import React from 'react';
import { Header, Wrapper } from '../../components/Slick/Slick.style';
import SlickReady from '../../components/Slick/SlickReady';

export default function ready() {
  return (
    <Wrapper w="1200px">
      <div>
        <SlickReady />
      </div>
    </Wrapper>
  );
}
