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

export default function RightNav({ open, setOpen }) {
  const token = SessionStorage.getItem('ACCESS_TOKEN');
  const onClickLogout = () => {
    SessionStorage.removeItem('ACCESS_TOKEN');
    window.location.href = '/';
    setOpen(false);
  };
  return (
    <>
      <TitleBlock open={open}>
        <label
          id="title"
          onClick={() => {
            Router.push('/');
            setOpen(false);
          }}
        >
          <img src="assets/images/title.png" alt="" />
        </label>
      </TitleBlock>
      <Ul open={open}>
        {token ? (
          <>
            <li>
              <label
                onClick={() => {
                  Router.push('/mybox');
                  setOpen(false);
                }}
              >
                <Icons>
                  <AiOutlineGift />
                </Icons>
                나의상자
              </label>
            </li>
            <li>
              <label
                onClick={() => {
                  Router.push('/create');
                  setOpen(false);
                }}
              >
                <Icons>
                  <AiOutlineMedicineBox />
                </Icons>
                기억함생성
              </label>
            </li>
            <li>
              <label
                onClick={() => {
                  Router.push('/mypage');
                  setOpen(false);
                }}
              >
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
            <label
              onClick={() => {
                Router.push('/login');
                setOpen(false);
              }}
            >
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
