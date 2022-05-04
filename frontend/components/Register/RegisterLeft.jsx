import React from 'react';
import { MainLeftWrapper } from '../Main/Main.style';

export default function RegisterLeft(props) {
  const data = props.data;
  return (
    <MainLeftWrapper>
      <div className="title">{data.boxName}</div>
      <div className="content">
        <p>{data.boxDescription}</p>
      </div>
      <div className="content">
        박스 오픈 예정 일<p>{data.boxOpenAt}</p>
      </div>
      <div className="content">
        <p>{data.boxLocName}</p>
        <p>{data.boxLocAddress}</p>
      </div>
    </MainLeftWrapper>
  );
}
