import React, { useEffect, useState } from 'react';
import {
  PcContentBlock,
  MobileContentBlock,
  LandingBlock,
  LandingWrapper,
  TitleBlock,
} from './Landing.style';
import 'antd/dist/antd.css';
import { Switch } from 'antd';
import Router from 'next/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from '../../styles/variables';

export default function Landing() {
  useEffect(() => {
    AOS.init();
  }, []);
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
                unCheckedChildren="혼자담기"
                checkedChildren="함께담기"
              />
            </div>
          </TitleBlock>
          {toggle ? (
            // 함께담기
            <>
              <PcContentBlock>
                <div
                  data-aos="fade-right"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo1.png" alt="" />
                  <div>하미가 여러분의 기억함을 안전하게 배달해요</div>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo2.png" alt="" />
                  <div>간직하고 싶은 기억들을 묻어봐요</div>
                </div>
                <div
                  data-aos="fade-right"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img
                    src="/assets/images/LandingTogether1.png"
                    alt=""
                    style={{ width: '50vw' }}
                  />
                  <div>친구들을 초대하고 함께 담아요</div>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img
                    src="/assets/images/LandingSolo3.png"
                    alt=""
                    style={{ width: '350px' }}
                  />
                  <div>장소도 담았다면 해당 위치에서만 확인이 가능해요</div>
                </div>
                <div
                  data-aos="fade-right"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo4.png" alt="" />
                  <div>이 화면에서 묻었던 기억들을 확인할 수 있어요</div>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img
                    src="/assets/images/LandingTogether2.png"
                    alt=""
                    style={{ width: '600px' }}
                  />
                  <div>만약 기억함을 확인하고 싶지않다면 숨겨주세요</div>
                </div>
              </PcContentBlock>
              <MobileContentBlock>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo1.png" alt="" />
                  <div>하미가 여러분의 기억함을 안전하게 배달해요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo2.png" alt="" />
                  <div>간직하고 싶은 기억들을 묻어봐요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img
                    src="/assets/images/LandingTogether1.png"
                    alt=""
                    style={{ width: '300px' }}
                  />
                  <div>친구들을 초대하고 함께 담아요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img
                    src="/assets/images/LandingSolo3.png"
                    alt=""
                    style={{ width: '200px' }}
                  />
                  <div>장소도 담았다면 해당 위치에서만 확인이 가능해요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo4.png" alt="" />
                  <div>이 화면에서 묻었던 기억들을 확인할 수 있어요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingTogether2.png" alt="" />
                  <div>만약 기억함을 확인하고 싶지않다면 숨겨주세요</div>
                </div>
              </MobileContentBlock>
            </>
          ) : (
            // 혼자담기
            <>
              <PcContentBlock>
                <div
                  data-aos="fade-right"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo1.png" alt="" />
                  <div>하미가 여러분의 기억함을 안전하게 배달해요</div>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo2.png" alt="" />
                  <div>간직하고 싶은 기억들을 묻어봐요</div>
                </div>
                <div
                  data-aos="fade-right"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img
                    src="/assets/images/LandingSolo3.png"
                    alt=""
                    style={{ width: '350px' }}
                  />
                  <div>장소도 담았다면 해당 위치에서만 확인이 가능해요</div>
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo4.png" alt="" />
                  <div>이 화면에서 묻었던 기억들을 확인할 수 있어요</div>
                </div>
              </PcContentBlock>
              <MobileContentBlock>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo1.png" alt="" />
                  <div>하미가 여러분의 기억함을 안전하게 배달해요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo2.png" alt="" />
                  <div>간직하고 싶은 기억들을 묻어봐요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img
                    src="/assets/images/LandingSolo3.png"
                    alt=""
                    style={{ width: '200px' }}
                  />
                  <div>장소도 담았다면 해당 위치에서만 확인이 가능해요</div>
                </div>
                <div
                  data-aos="zoom-in"
                  data-aos-easing="ease-in-cubic"
                  className="content"
                >
                  <img src="/assets/images/LandingSolo4.png" alt="" />
                  <div>이 화면에서 묻었던 기억들을 확인할 수 있어요</div>
                </div>
              </MobileContentBlock>
            </>
          )}
          <Button
            style={{ marginBottom: '30px' }}
            onClick={() => {
              Router.push('/main');
            }}
          >
            시작하기
          </Button>
        </LandingBlock>
      </LandingWrapper>
    </div>
  );
}
