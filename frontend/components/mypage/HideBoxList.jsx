import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getHideBox } from '../../api/box';
import Loading from '../Loading/Loading';
import BoxList from '../mybox/BoxList';
const HideBoxWrapper = styled.div`
  /* max-width: 1000px; */
  height: 70vh;
  padding: 1%;
  background-color: #7b7373b9;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default function HideBoxList() {
  const { data: hideData, isLoading } = useQuery(
    ['hidedata'],
    async () => {
      return getHideBox();
    },
    {
      onSuccess: res => {
        console.log(res, '성공');
      },
      onError: err => {
        console.log(err, '에러');
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  function dataList() {
    if (hideData) {
      // console.log(hideData);
      return hideData.map((box, idx) => {
        // console.log(box, idx, '숨겨진박스');
        return <BoxList boxInfo={box} key={idx} num={4} categori={4} />;
      });
    } else {
      return <div>숨긴 함이 없어욤!!</div>;
    }
  }

  return <HideBoxWrapper>{dataList()}</HideBoxWrapper>;
}
