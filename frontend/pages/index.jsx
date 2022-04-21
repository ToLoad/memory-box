import React from 'react';
import MainLeft from '../components/Main/MainLeft';
import MainRight from '../components/Main/MainRight';
import { MainWrapper } from '../components/Main/Main.style';

export default function index() {
  return (
    <MainWrapper>
      <MainLeft />
      <MainRight />
    </MainWrapper>
  );
}
