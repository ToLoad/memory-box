import React, { useState } from 'react';
import { CartegoriWrapper, CartegoriContent } from './Categori.style';

export default function Cartegori(props) {
  // state 변경은 props을 통해 변경시켜 준다.
  return (
    <CartegoriWrapper>
      <CartegoriContent>
        <div
          className="content"
          onClick={() => {
            props.set(0);
          }}
        >
          <div className={props.cat === 0 ? 'click' : ''}>All</div>
        </div>
        <div
          className="content"
          onClick={() => {
            props.set(1);
          }}
        >
          <div className={props.cat === 1 ? 'click' : ''}>대기 함</div>
        </div>
        <div
          className="content"
          onClick={() => {
            props.set(2);
          }}
        >
          <div className={props.cat === 2 ? 'click' : ''}>닫힌 함</div>
        </div>
        <div
          className="content"
          onClick={() => {
            props.set(3);
          }}
        >
          <div className={props.cat === 3 ? 'click' : ''}>열린 함</div>
        </div>
      </CartegoriContent>
    </CartegoriWrapper>
  );
}
