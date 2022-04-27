import React from 'react';
import { MainLeftWrapper } from './Main.style';

export default function MainPageLeft() {
  return (
    <MainLeftWrapper>
      <div className="d-day">
        도착까지
        <div className="time"> 1550일 14 : 12</div>
      </div>
      <div className="title">부울경 2반의 추억여행</div>
      <div className="content">
        <p>
          부울경 2반의 추억여행 타임캡슐 입니다. 이 타임캡슐은 10년 뒤 open 될
          예정입니다. 다들 즐거운 추억 보관하시길 바랍니다.
        </p>
      </div>
    </MainLeftWrapper>
  );
}
