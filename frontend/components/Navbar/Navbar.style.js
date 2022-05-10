import styled from 'styled-components';

const NavbarWrapper = styled.div`
  position: absolute;
  box-sizing: border-box; // 전역에는 되어있음
  height: 60px;
  z-index: 100;
  color: white;
  font-size: 20px;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  padding: 13px;
  padding-left: 20px;
`;

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  right: 0;
  z-index: 52;
  display: none;
  @media ${props => props.theme.tablet} {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    cursor: pointer;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? 'black' : '#fff')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  label {
    cursor: pointer;
    margin-top: 10px;
  }
  img {
    width: 100px;
  }
  @media ${props => props.theme.tablet} {
    width: 83%;
    text-align: center;
    padding-right: 15px;
    color: ${({ open }) => (open ? 'black' : '#fff')};
    z-index: 52;
  }
`;

const Icons = styled.div`
  font-size: 1.3em;
  margin-right: 3px;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  right: 0;
  li {
    padding-right: 20px;
  }
  label {
    display: flex;
    cursor: pointer;
    .icons {
      font-size: 1.1em;
      margin-right: 3px;
    }
  }
  @media ${props => props.theme.tablet} {
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 51;
    flex-flow: column nowrap;
    position: absolute;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 57px;
    transition: transform 0.3s ease-in-out;
    li {
      color: black;
      font-size: 22px;
      display: flex;
      justify-content: center;
      padding: 10px 0;
      border-bottom: 2px solid gray;
    }
  }
`;
const HiddenBodyWrapper = styled.div`
  @media ${props => props.theme.tablet} {
    backdrop-filter: blur(10px);
    z-index: 50;
    display: ${({ open }) => (open ? 'block' : 'none')};
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    bottom: 0;
  }
`;

export {
  NavbarWrapper,
  Ul,
  StyledBurger,
  HiddenBodyWrapper,
  TitleBlock,
  Icons,
};
