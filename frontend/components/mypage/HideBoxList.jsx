import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { getHideBox } from '../../api/box';
import Loading from '../Loading/Loading';
import BoxList from '../mybox/BoxList';
const HideBoxWrapper = styled.div`
  /* max-width: 1000px; */
  max-width: 700px;
  height: 70vh;
  padding: 1%;
  background-color: #c7bcbcd1;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* 스크롤바 막대 설정*/
  ::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: rgba(255, 255, 255, 1);
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

  .none {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: black;
    font-weight: 1000;
    text-align: center;
    margin: auto;
  }
`;

export default function HideBoxList() {
  const queryClient = useQueryClient();
  const { data: hideData, isLoading } = useQuery(['hidedata'], async () => {
    return getHideBox();
  });

  if (isLoading) {
    return <Loading />;
  }

  queryClient.invalidateQueries('hidedata');
  function dataList() {
    if (hideData) {
      // console.log(hideData);
      return hideData.map((box, idx) => {
        // console.log(box, idx, '숨겨진박스');
        return <BoxList boxInfo={box} key={idx} num={4} categori={4} />;
      });
    } else {
      return <div className="none">숨긴 기억함이 없습니다!!</div>;
    }
  }

  return <HideBoxWrapper>{dataList()}</HideBoxWrapper>;
}
