import React from 'react';
import { HiddenBodyWrapper, Icons, TitleBlock, Ul } from './Navbar.style';
import {
  AiOutlineGift,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMedicineBox,
  AiOutlineUser,
} from 'react-icons/ai';
import Router from 'next/router';
import { SessionStorage } from '../../api';

export default function RightNav({ open }) {
  const token = SessionStorage.getItem('ACCESS_TOKEN');
  const onClickLogout = () => {
    SessionStorage.removeItem('ACCESS_TOKEN');
    window.location.href = '/';
  };
  return (
    <>
      <TitleBlock open={open}>
        <label id="title" onClick={() => Router.push('/')}>
          기억:함(函)
        </label>
      </TitleBlock>
      <Ul open={open}>
        {token ? (
          <>
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
              <label onClick={() => Router.push('/mypage')}>
                <Icons>
                  <AiOutlineUser />
                </Icons>
                마이페이지
              </label>
            </li>
            <li>
              <label onClick={onClickLogout}>
                <Icons>
                  <AiOutlineLogout />
                </Icons>
                로그아웃
              </label>
            </li>
          </>
        ) : (
          <li>
            <label onClick={() => Router.push('/login')}>
              <Icons>
                <AiOutlineLogin />
              </Icons>
              로그인
            </label>
          </li>
        )}
      </Ul>
      <HiddenBodyWrapper open={open} />
    </>
  );
}
