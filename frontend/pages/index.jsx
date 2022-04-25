import React from 'react';
// import MainLeft from '../components/Main/MainLeft';
import MainPage from '../components/Main/MainPage';
import { MainWrapper } from '../components/Main/Main.style';
// import MainPageSlide from '../components/Main/MainPageSlide';

export default function index() {
  return (
    <MainWrapper>
      <MainPage />
      {/* <MainPageSlide /> */}
    </MainWrapper>
  );
}
