import React, { useEffect, useState } from 'react';
import { ButtonWrapper, ButtonContent } from './Mybox.style';

const DdayButton = props => {
  // number에 따라 달라짐 준비, 닫힘 열림 버튼에 텍스쳐가 바뀌어야함
  function ButtonColor() {
    // console.log(props.num, '넘버');
    switch (props.num) {
      case 1:
        return '#36A900';
      case 2:
        return '#FFA364';
      case 3:
        return '#64A2FF';
    }
  }

  function DayText() {
    switch (props.num) {
      case 1:
        return '준비중';
      case 2:
        const result = DdayofBox();

        return result;
      case 3:
        return '열림';
    }
  }

  // day가 남았을 때 day 입력
  function DdayofBox() {
    const day = props.day;
    if (day === 0) {
      return 'D-day';
    }
    if (day >= 365) {
      year = day / 365;
      return `${year}년`;
    } else {
      return `D-${day}`;
    }
  }

  return (
    <ButtonWrapper color={ButtonColor}>
      <ButtonContent>{DayText()}</ButtonContent>
    </ButtonWrapper>
  );
};

export default DdayButton;
