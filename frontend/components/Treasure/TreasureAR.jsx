import React from 'react';
import styled from 'styled-components';
import AR from '../AR';

const ARWrapper = styled.div`
  /* max-width: 1000px; */
  max-width: 1000px;
  width: 100%;
  height: 70vh;
  position: absolute;
  top: 0;
  /* background-color: red; */
  z-index: 10;
`;

const ARContent = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: blue; */
  border-radius: 10px;
  .button {
    position: fixed;
    top: 60px;
    right: 60px;
    @media ${props => props.theme.mobile} {
      top: 60px;
      right: 10px;
    }
  }
`;

export default function TreasureAR(props) {
  return (
    <>
      <ARWrapper modal={props.modal}>
        <ARContent>
          <button
            className="button"
            onClick={() => {
              props.cancel();
            }}
            style={{ zIndex: 10000 }}
          >
            끄기
          </button>
          <AR lat={props.lat} lot={props.lot} />
        </ARContent>
      </ARWrapper>
    </>
  );
}
