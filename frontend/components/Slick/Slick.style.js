import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-top: 60px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  min-height: 650px;
  & > div {
    text-align: center;
    max-width: ${props => props.w};
    margin: 0 auto;
    position: absolute;
    left: 5px;
    right: 5px;
  }
`;

const Header = styled.div`
  font-size: 25px;
  margin-bottom: 30px;
  color: white;
  .open-ready-button {
    color: black;
  }
`;

const SlickBlock = styled.div`
  margin: 20px 50px;
  .slick-next {
    right: 10px;
  }
  .slick-prev {
    left: -33px;
  }
  .slick-next::before {
    content: url('/assets/images/right-arrow.png');
  }
  .slick-prev::before {
    content: url('/assets/images/left-arrow.png');
  }
  @media ${props => props.theme.mobile} {
    margin: 20px 30px;
  }
`;
const ReadyCard = styled.div`
  padding: 20px 0;
  .ready-card-block {
    display: inline-block;
    height: 200px;
    width: 240px;
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: ${props =>
      props.state ? '2px 7px 15px 4px rgba(0, 0, 0, 0.2)' : 'none'};
    background-color: ${props =>
      props.state ? 'rgba(255, 255, 255, 0.15)' : 'rgba(130, 130, 130, 0.5)'};
    backdrop-filter: blur(10px);
    z-index: 10;
  }
  .ready-card-close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 25px;
    cursor: pointer;
  }
  .ready-card-profile {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 30px;
    margin-bottom: 15px;
    background-color: white;
    overflow: hidden;
  }
  .ready-card-profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: ${props => (props.state ? 'normal' : 'luminosity')};
  }
  .ready-card-name {
    color: white;
    font-size: 20px;
  }
  @media (max-width: 320px) {
    .ready-card-block {
      width: 100%;
    }
  }
`;
const OpenCard = styled.div`
  padding: 20px 0;
  .open-card-profile {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      mix-blend-mode: ${props => (props.come ? 'normal' : 'luminosity')};
    }
  }
  .open-card-name {
    color: ${props => (props.come ? 'black' : 'gray')};
    font-size: 20px;
    margin-top: 10px;
  }
`;

export { Wrapper, Header, SlickBlock, OpenCard, ReadyCard };
