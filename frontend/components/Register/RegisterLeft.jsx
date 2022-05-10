import React from 'react';
import { MainLeftWrapper } from '../Main/Main.style';

export default function RegisterLeft(props) {
  const data = props.data;
  return (
    <MainLeftWrapper>
      <div className="title">{data.boxName}</div>
      <div className="content">
        <p className="subTitle">📣 기억함 설명</p>
        <p>{data.boxDescription}</p>
      </div>
      <div className="opendate">
        <p className="subTitle">🎁 박스 오픈 예정 일</p>
        <p>{data.boxOpenAt}</p>
      </div>
      {data.boxLocAddress !== '' && (
        <div className="address">
          <p className="subTitle">📌 오픈 예정 장소 이름</p>
          <p>{data.boxLocName}</p>
          <p className="subTitle">🧭 오픈 예정 장소 주소</p>
          <p>{data.boxLocAddress}</p>
        </div>
      )}
    </MainLeftWrapper>
  );
}
