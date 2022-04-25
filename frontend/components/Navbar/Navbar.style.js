import styled from 'styled-components';

const NavbarWrapper = styled.div`
  color: white;
  font-size: 20px;
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 13px;
  padding-left: 20px;
`;

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 1023px) {
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
  font-size: 1.2em;
  label {
    cursor: pointer;
  }
  @media (max-width: 1023px) {
    color: ${({ open }) => (open ? 'black' : '#fff')};
    z-index: 20;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: fixed;
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
  @media (max-width: 1023px) {
    z-index: 1;
    flex-flow: column nowrap;
    background-color: white;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
    top: 0;
    height: 235px;
    width: 100vw;
    padding-top: 3.5rem;
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
  @media (max-width: 1023px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    /* z-index: 10; */
  }
`;

export { NavbarWrapper, Ul, StyledBurger, HiddenBodyWrapper, TitleBlock };
