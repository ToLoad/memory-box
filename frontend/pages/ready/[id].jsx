import React, { useEffect } from 'react';
import { Header, Wrapper } from '../../components/Slick/Slick.style';
import SlickReady from '../../components/Slick/SlickReady';

export default function ready() {
  return (
    <Wrapper w="1200px">
      <div>
        <Header>
          <div>함께하는 멤버</div>
        </Header>
        <SlickReady />
      </div>
    </Wrapper>
  );
}
