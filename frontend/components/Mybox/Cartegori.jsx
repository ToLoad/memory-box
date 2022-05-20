import React from 'react';
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
          <div className={props.cat === 0 ? 'click' : ''}>배달중</div>
        </div>
        <div
          className="content"
          onClick={() => {
            props.set(1);
          }}
        >
          <div className={props.cat === 1 ? 'click' : ''}>배달완료</div>
        </div>
      </CartegoriContent>
    </CartegoriWrapper>
  );
}
