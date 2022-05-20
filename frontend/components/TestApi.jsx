import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getBox } from '../api/box';
import { getUserInfo } from '../api/user';
const Wrapper = styled.div`
  max-width: 700px;
  height: 50vh;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(13px);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  border-radius: 20px;
  padding: 10px;
`;

export default function TestApi() {
  const { data, isLoading } = useQuery('getitem', async () => {
    return getBox(1);
  });

  const { data: userInfo, isLoading: userInfoLoading } = useQuery(
    'getUserInfo',
    async () => {
      return getUserInfo();
    },
  );

  console.log(data, userInfo);

  return <>{data.boxName}</>;
}
