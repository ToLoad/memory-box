import styled from 'styled-components';

const NavbarWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

const NavbarLeft = styled.div`
  margin-left: 10px;
  width: 40%;
  font-size: 18px;
`;
const NavbarRight = styled.div`
  margin-right: 10px;
  display: flex;
  justify-content: end;
  width: 60%;
  font-size: 18px;
  .contents {
    padding-right: 10px;
  }
`;

export { NavbarWrapper, NavbarLeft, NavbarRight };
