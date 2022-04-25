import React, { useState } from 'react';
import { StyledBurger } from './Navbar.style';
import RightNav from './RightNav';

export default function Burger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} />
    </>
  );
}
