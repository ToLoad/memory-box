import React from 'react';
import { MainWrapper } from '../components/Main/Main.style';
import RegisterLeft from '../components/Register/RegisterLeft';
import RegisterRight from '../components/Register/RegisterRight';

export default function register() {
  return (
    <div>
      <MainWrapper>
        <RegisterLeft />
        <RegisterRight />
      </MainWrapper>
    </div>
  );
}
