import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Header,
  SlickBlock,
  Wrapper,
  ReadyCard,
} from '../components/Slick/Slick.style';
import { Button } from '../styles/variables';
export default function ready() {
  const settings = {
    infinite: false,
    speed: 500,
    fade: true,
    rows: 2,
    slidesPerRow: 3,
    responsive: [
      { breakpoint: 1024, settings: { rows: 2, slidesPerRow: 2 } },
      { breakpoint: 768, settings: { rows: 2, slidesPerRow: 1 } },
      { breakpoint: 480, settings: { rows: 3, slidesPerRow: 2 } },
    ],
  };
  return (
    <Wrapper w="1200px">
      <div>
        <Header>
          <div>함께하는 멤버</div>
        </Header>
        <SlickBlock>
          <Slider {...settings}>
            <ReadyCard>
              <div className="ready-card-block">
                <img src="혼구리2.png" alt="혼구리" />
                <div className="ready-card-name">지수민</div>
              </div>
            </ReadyCard>
            <ReadyCard>
              <div className="ready-card-block">
                <img src="혼구리2.png" alt="혼구리" />
                <div className="ready-card-name">지수민</div>
              </div>
            </ReadyCard>
            <ReadyCard>
              <div className="ready-card-block">
                <img src="혼구리2.png" alt="혼구리" />
                <div className="ready-card-name">지수민</div>
              </div>
            </ReadyCard>
            <ReadyCard>
              <div className="ready-card-block">
                <img src="혼구리2.png" alt="혼구리" />
                <div className="ready-card-name">지수민</div>
              </div>
            </ReadyCard>
            <ReadyCard>
              <div className="ready-card-block">
                <img src="혼구리2.png" alt="혼구리" />
                <div className="ready-card-name">지수민</div>
              </div>
            </ReadyCard>
            <ReadyCard>
              <div className="ready-card-block">
                <img src="혼구리2.png" alt="혼구리" />
                <div className="ready-card-name">지수민</div>
              </div>
            </ReadyCard>
            <ReadyCard>
              <div className="ready-card-block">
                <img src="혼구리2.png" alt="혼구리" />
                <div className="ready-card-name">지수민</div>
              </div>
            </ReadyCard>
          </Slider>
        </SlickBlock>
        <Button>기억함 묻기</Button>
      </div>
    </Wrapper>
  );
}
