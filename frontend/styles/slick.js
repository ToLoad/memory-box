import styled from 'styled-components';

const Button = styled.div`
  margin: 20px 0;
  display: inline-block;
  background-color: #ffebd2;
  width: 120px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 30px;
  &:hover {
    background-color: #ffa53a;
    transition: 0.3s;
  }
  @media ${props => props.theme.mobile} {
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 30px;
  }
`;

const Wrapper = styled.div`
  text-align: center;
  max-width: ${props => props.w};
  margin: 0 auto;
`;

const Header = styled.div`
  font-size: 20px;
  margin: 30px 0;
  color: white;
  @media ${props => props.theme.mobile} {
    font-size: 16px;
    margin: 10px 0;
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
    content: url('/right-arrow.png');
    font-size: 40px;
    color: white;
  }
  .slick-prev::before {
    content: url('/left-arrow.png');
    font-size: 40px;
    color: white;
  }
  @media ${props => props.theme.mobile} {
    margin: 20px 30px;
  }
`;
const ReadyCard = styled.div`
  padding: 20px 0;
  .ready-card-block {
    display: inline-block;
    height: 230px;
    width: 260px;
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 2px 7px 15px 4px rgba(0, 0, 0, 0.2);
    z-index: 0;
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.15);
      z-index: -1;
    }
    @media ${props => props.theme.mobile} {
      height: 100px;
      width: 110px;
      border-radius: 20px;
    }
  }
  .ready-card-block img {
    display: inline-block;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    margin-top: 30px;
    margin-bottom: 15px;
    background-color: gray;
    @media ${props => props.theme.mobile} {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-top: 10px;
      margin-bottom: 5px;
    }
  }
  .ready-card-name {
    color: white;
    font-size: 20px;
    @media ${props => props.theme.mobile} {
      font-size: 12px;
    }
  }
`;
const OpenCard = styled.div`
  padding: 20px 0;
  div {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: gray;
    border-radius: 50%;
    overflow: hidden;
    @media ${props => props.theme.mobile} {
      width: 60px;
      height: 60px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: ${props => (props.come === 0 ? 'luminosity' : 'normal')};
  }
`;

export { Button, Wrapper, Header, SlickBlock, OpenCard, ReadyCard };
