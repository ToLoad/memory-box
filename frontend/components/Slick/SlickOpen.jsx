import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Header, OpenCard, SlickBlock } from './Slick.style';
const settings = {
  infinite: false,
  speed: 500,
  fade: true,
  rows: 2,
  slidesPerRow: 4,
  responsive: [
    { breakpoint: 1024, settings: { rows: 2, slidesPerRow: 3 } },
    { breakpoint: 768, settings: { rows: 2, slidesPerRow: 2 } },
    { breakpoint: 480, settings: { rows: 3, slidesPerRow: 3 } },
  ],
};
export default function SlickOpen() {
  return (
    <>
      <Header>
        <div>대기중...</div>
        <div>기억함을 열기까지 {}명이 필요해요</div>
      </Header>
      <SlickBlock>
        <Slider {...settings}>
          <OpenCard className="slick-card" come={1}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={1}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={1}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={1}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={1}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={1}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={1}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={0}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={0}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={0}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={0}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
          <OpenCard className="slick-card" come={0}>
            <div>
              <img src="혼구리2.png" alt="혼구리" />
            </div>
          </OpenCard>
        </Slider>
      </SlickBlock>
    </>
  );
}
