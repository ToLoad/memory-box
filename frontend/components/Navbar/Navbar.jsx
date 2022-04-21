import React from 'react';
import { NavbarLeft, NavbarRight, NavbarWrapper } from './Navbar.style';

export default function Navbar() {
  return (
    <NavbarWrapper>
      <NavbarLeft>
        <div className="title">기억:함</div>
      </NavbarLeft>
      <NavbarRight>
        <div className="contents">기억:함</div>
        <div className="contents">나의캡슐</div>
        <div className="contents">캡슐등록</div>
        <div className="contents">로그인</div>
      </NavbarRight>
    </NavbarWrapper>
  );
}
