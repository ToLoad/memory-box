import React from 'react';
import styled from 'styled-components';

const ARWrapper = styled.div`
  /* max-width: 1000px; */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  /* background-color: red; */
  z-index: 10;
`;

const ARContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: blue;
  border-radius: 10px;
  .button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export default function TreasureAR(props) {
  return (
    <ARWrapper modal={props.modal}>
      <ARContent>
        <button
          className="button"
          onClick={() => {
            props.cancel();
          }}
        >
          끄기
        </button>
        <div>안녕하세요</div>
        <div>동준이에요</div>
        <div>이거는 테스트용이에요</div>
        <div>됐으면 좋겠어요</div>
        <div>헤헤</div>
        <div>{props.lat}</div>
        <div>{props.lot}</div>
      </ARContent>
    </ARWrapper>
  );
}
