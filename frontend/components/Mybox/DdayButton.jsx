import React, { useEffect, useState } from 'react';
import { ButtonWrapper, ButtonContent } from './Mybox.style';

const DdayButton = props => {
  // number에 따라 달라짐 준비, 닫힘 열림 버튼에 텍스쳐가 바뀌어야함
  function ButtonColor() {
    // console.log(props.num, '넘버');
    // eslint-disable-next-line default-case
    switch (props.num) {
      case 0:
        return '#9033e2';
      case 1:
        return '#36A900';
      case 2:
        return '#FFA364';
      case 3:
        return '#64A2FF';
      case 4:
        //  숨김함 조회일 때 버튼!
        return '#222122';
    }
  }

  function DayText() {
    switch (props.num) {
      case 0:
        return '준비중';
      case 1:
        return '열어줘!';
      case 2:
        const result = DdayofBox();
        return result;
      case 3:
        return '열림';
      case 4:
        return '숨겨짐';
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
