import React, { useState } from 'react';
import { LandingBlock, LandingWrapper } from './Landing.style';
import { Switch } from 'antd';
import 'antd/dist/antd.css';

export default function Landing() {
  const [toggle, setToggle] = useState(false);
  const onClickToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <LandingWrapper>
        <LandingBlock>
          <img src="assets/images/title.png" alt="" />
          <div id="subTitle">{!toggle ? '혼자담기' : '함께담기'}</div>
          <div id="content">
            기억:함(函) 은 지금도 기억 배달중! <br />
            <br />
            친구, 동생, 가족들과 함께 <br />
            간직하고 싶었던 기억들이 있나요? <br />
            <br />
            그땐 참 좋았는데.. <br />
            이런 기억을 돌아볼 수 있는 시간이 요즘엔 잘 없는 것 같아요 <br />
            <br />
            이럴때 기억:함(函) 을사용 해 보는건 어떨까요?
          </div>
          <Switch onChange={onClickToggle} />
        </LandingBlock>
      </LandingWrapper>
    </div>
  );
}
