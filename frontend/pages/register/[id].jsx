import React, { useEffect, useState } from 'react';
import { MainWrapper } from '../../components/Main/Main.style';
import RegisterLeft from '../../components/Register/RegisterLeft';
import RegisterRight from '../../components/Register/RegisterRight';
import Loading from '../../components/Loading/Loading';
import Router, { useRouter } from 'next/router';
import { getMemoryBox } from '../../api/eunseong';
import { useQuery } from 'react-query';
import { getBox } from '../../api/box';
import { SessionStorage } from '../../api/index';

export default function register() {
  const router = useRouter();
  const id = router.query.id;
  const token = SessionStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    // 로그인 체크
    if (token === null) {
      Router.push('/login');
    }
  }, []);

  // 기억틀 만들기 api 호출하기
  const { data: createMemoryBox, isLoading: createMemoryBoxLoading } = useQuery(
    'getMemoryBox',
    () => {
      return getMemoryBox(id);
    },
    {
      enabled: !!id, // id 받아왔을 때 실행
    },
  );
  // id에 맞는 방 정보 받아와서 띄우기
  const { data: BoxDetail, isLoading: getBoxLoading } = useQuery(
    'getBox',
    () => {
      return getBox(id);
    },
    {
      enabled: !!createMemoryBox, // useQuery 동기적 실행
    },
  );
  // getboxid
  return (
    <>
      <MainWrapper>
        {createMemoryBox ? (
          <RegisterLeft data={createMemoryBox} />
        ) : (
          <Loading />
        )}
        <RegisterRight id={id} />
      </MainWrapper>
    </>
  );
}
