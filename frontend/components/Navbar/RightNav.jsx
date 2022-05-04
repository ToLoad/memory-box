import React from 'react';
import { HiddenBodyWrapper, Icons, TitleBlock, Ul } from './Navbar.style';
import {
  AiOutlineGift,
  AiOutlineMedicineBox,
  AiOutlineUser,
} from 'react-icons/ai';
import Router from 'next/router';
export default function RightNav({ open }) {
  return (
    <>
      <TitleBlock open={open}>
        <label id="title" onClick={() => Router.push('/')}>
          기억:함(函)
        </label>
      </TitleBlock>
      <Ul open={open}>
        <li>
          <label onClick={() => Router.push('/mybox')}>
            <Icons>
              <AiOutlineGift />
            </Icons>
            나의상자
          </label>
        </li>
        <li>
          <label onClick={() => Router.push('/create')}>
            <Icons>
              <AiOutlineMedicineBox />
            </Icons>
            기억함생성
          </label>
        </li>
        <li>
          <label onClick={() => Router.push('/login')}>
            <Icons>
              <AiOutlineUser />
            </Icons>
            로그인
          </label>
        </li>
      </Ul>
      <HiddenBodyWrapper open={open} />
    </>
  );
}
