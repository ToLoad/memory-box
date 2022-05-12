import React, { useState } from 'react';
import {
  ContentBlock,
  LandingBlock,
  LandingWrapper,
  TitleBlock,
} from './Landing.style';
import 'antd/dist/antd.css';
import { Switch } from 'antd';
import Router from 'next/router';
export default function Landing() {
  const [toggle, setToggle] = useState(false);
  const onClickToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <LandingWrapper>
        <LandingBlock>
          <TitleBlock>
            <img
              src="assets/images/title.png"
              alt=""
              onClick={() => {
                Router.push('/main');
              }}
            />
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
              이럴때 기억:함(函)을 사용 해 보는건 어떨까요?
            </div>
            <div id="toggle">
              <Switch
                onChange={onClickToggle}
                unCheckedChildren="함께담기"
                checkedChildren="혼자담기"
              />
            </div>
          </TitleBlock>
          {toggle ? (
            // 함께담기
            <ContentBlock>
              <div className="content">
                <img src="/assets/images/test.jpg" alt="" />
                <div>하미가 여러분의 기억함을 안전하게 배달해요</div>
              </div>
              <div className="content" id="right">
                <div>간직하고 싶은 기억들을 묻어봐요</div>
                <img src="/assets/images/TEST2.png" alt="" />
              </div>
              <div className="content">
                <img src="/assets/images/night.png" alt="" />
                <div>친구들을 초대하고 함께 담아요</div>
              </div>
              <div className="content" id="right">
                <div>장소도 담았다면 해당 위치에서만 확인이 가능해요</div>
                <img src="/assets/images/night.png" alt="" />
              </div>
              <div className="content">
                <img src="/assets/images/night.png" alt="" />
                <div>이 화면에서 기억들을 확인할 수 있어요</div>
              </div>
              <div className="content" id="right">
                <div>만약 기억함을 확인하고 싶지않다면 숨겨주세요</div>
                <img src="/assets/images/night.png" alt="" />
              </div>
            </ContentBlock>
          ) : (
            // 혼자담기
            <ContentBlock>
              <div className="content">
                <img src="/assets/images/Day.png" alt="" />
                <div>하미가 여러분의 기억함을 안전하게 배달해요</div>
              </div>
              <div className="content" id="right">
                <div>간직하고 싶은 기억들을 묻어봐요</div>
                <img src="/assets/images/Day.png" alt="" />
              </div>
              <div className="content">
                <img src="/assets/images/Day.png" alt="" />
                <div>장소도 담았다면 해당 위치에서만 확인이 가능해요</div>
              </div>
              <div className="content" id="right">
                <div>이 화면에서 기억들을 확인할 수 있어요</div>
                <img src="/assets/images/Day.png" alt="" />
              </div>
            </ContentBlock>
          )}
        </LandingBlock>
      </LandingWrapper>
    </div>
  );
}
