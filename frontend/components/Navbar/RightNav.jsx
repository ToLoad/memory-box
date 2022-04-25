import React from 'react';
import { HiddenBodyWrapper, TitleBlock, Ul } from './Navbar.style';
import Link from 'next/link';
import {
  AiOutlineGift,
  AiOutlineMedicineBox,
  AiOutlineUser,
} from 'react-icons/ai';
export default function RightNav({ open }) {
  return (
    <>
      <TitleBlock open={open}>
        <Link href="/">
          <label id="title">기억:함(函)</label>
        </Link>
      </TitleBlock>
      <Ul open={open}>
        <li>
          <Link href="mybox">
            <label>
              <div className="icons">
                <AiOutlineGift />
              </div>
              나의상자
            </label>
          </Link>
        </li>
        <li>
          <Link href="create">
            <label>
              <div className="icons">
                <AiOutlineMedicineBox />
              </div>
              기억함생성
            </label>
          </Link>
        </li>
        <li>
          <Link href="mybox">
            <label>
              <div className="icons">
                <AiOutlineUser />
              </div>
              로그인
            </label>
          </Link>
        </li>
      </Ul>
      <HiddenBodyWrapper open={open} />
    </>
  );
}
