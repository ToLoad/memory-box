/* eslint-disable no-else-return */
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 900px;
  @media ${props => props.theme.mobile} {
    max-width: 350px;
  }
`;
const MapContainer = styled.div`
  height: 100%;
`;

// const value = true;
// console.log(value);
/* background-color: ${value ? 'black' : 'red'}; */

const Background = styled.div`
  position: fixed;
  width: 110vw;
  overflow-x: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  &.day {
    background-image: url('/assets/images/Day.png');
    @media ${props => props.theme.mobile} {
      background-image: url('/assets/images/mobileDay.png');
      width: 100%;
    }
  }

  &.night {
    background-image: url('/assets/images/night.png');
    @media ${props => props.theme.mobile} {
      background-image: url('/assets/images/mobileNight.png');
      width: 100%;
    }
  }
`;

const Button = styled.div`
  min-width: 100px;
  display: inline-block;
  background-color: #ffebd2;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 30px;
  margin: 10px;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #ffa53a;
    transition: 0.3s;
  }
  @media ${props => props.theme.mobile} {
    font-size: 14px;
    border-radius: 20px;
  }
`;

export { Wrapper, MapContainer, Background, Button };
