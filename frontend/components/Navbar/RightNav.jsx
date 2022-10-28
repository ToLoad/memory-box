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
import Image from 'next/image';
import { LocalStorage } from '../../api';

export default function RightNav({ open, setOpen }) {
  const token = LocalStorage.getItem('ACCESS_TOKEN');
  const onClickLogout = () => {
    LocalStorage.removeItem('ACCESS_TOKEN');
    window.location.href = '/main';
    setOpen(false);
  };
  return (
    <>
      <TitleBlock open={open}>
        <label
          id="title"
          onClick={() => {
            Router.push('/main');
            setOpen(false);
          }}
        >
          {/* 이미지 아니고 메인입니다 */}
          {/* <img src="assets/images/navbarTitle.png"></img> */}
          <Image
            src="/assets/images/title.png"
            priority
            layout="fixed"
            width={100}
            height={50}
            quality={100}
            objectFit="cover"
          />
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
                <Icons>🎁</Icons>
                나의기억함
              </label>
            </li>
            <li>
              <label
                onClick={() => {
                  Router.push('/create');
                  setOpen(false);
                }}
              >
                <Icons>🔒</Icons>
                기억함생성
              </label>
            </li>
            <li>
              <label
                onClick={() => {
                  Router.push('/treasure');
                  setOpen(false);
                }}
              >
                <Icons>💎</Icons>
                보물찾기
              </label>
            </li>
            <li>
              <label
                onClick={() => {
                  Router.push('/mypage');
                  setOpen(false);
                }}
              >
                <Icons>🧑🏻</Icons>
                마이페이지
              </label>
            </li>
            <li>
              <label onClick={onClickLogout}>
                <Icons>❌</Icons>
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
              <Icons>✅</Icons>
              로그인
            </label>
          </li>
        )}
      </Ul>
      <HiddenBodyWrapper
        open={open}
        onClick={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
