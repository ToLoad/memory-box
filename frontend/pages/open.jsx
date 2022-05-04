import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Wrapper,
  Header,
  SlickBlock,
  OpenCard,
} from '../components/Slick/Slick.style';
import { Button } from '../styles/variables';
import SlickOpen from '../components/Slick/SlickOpen';

export default function open() {
  return (
    <Wrapper w="1000px">
      <div>
        <SlickOpen />
        <Button>기억함 열기</Button>
      </div>
    </Wrapper>
  );
}
