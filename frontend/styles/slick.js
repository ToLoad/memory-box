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
  max-width: 1000px;
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
    right: -10px;
  }
  .slick-prev {
    left: -55px;
  }
  .slick-next:before {
    content: url('/right-arrow.png');
    font-size: 40px;
    color: white;
  }
  .slick-prev:before {
    content: url('/left-arrow.png');
    font-size: 40px;
    color: white;
  }
  /* border: 5px solid blue; */
`;
const ReadyCard = styled.div`
  /* border: 1px solid red; */
  /* padding: 20px; */
  /* .ready-card-block {
    background-color: inherit;
    border-radius: 20px;
    height: 250px;
    box-shadow: 0 0 8px gray;
    filter: blur(15px);
  } */
  .ready-card-block:before {
    background-color: white;
    border-radius: 20px;
    height: 250px;
    /* box-shadow: 0 0 8px gray; */
    filter: blur(15px);
  }
  .ready-card-block img {
    display: inline-block;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid gray;
    margin: 30px 0;
  }
  .ready-card-name {
    color: black;
    font-size: 20px;
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
