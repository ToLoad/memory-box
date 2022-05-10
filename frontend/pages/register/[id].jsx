import React, { useEffect, useState } from 'react';
import { MainWrapper } from '../../components/Main/Main.style';
import RegisterLeft from '../../components/Register/RegisterLeft';
import RegisterRight from '../../components/Register/RegisterRight';
import Loading from '../../components/Loading/Loading';
import Router, { useRouter } from 'next/router';
import { getMemoryBox } from '../../api/eunseong';
import { useQuery } from 'react-query';
import { SessionStorage } from '../../api/index';

export default function register() {
  const router = useRouter();
  const id = router.query.id;
  const token = SessionStorage.getItem('ACCESS_TOKEN');

  // 기억틀 만들기 api 호출하기
  const {
    data: createMemoryBox,
    isLoading: createMemoryBoxLoading,
    refetch,
  } = useQuery(
    ['getMemoryBox', id],
    () => {
      return getMemoryBox(id);
    },
    {
      enabled: !!id, // id 받아왔을 때 실행
    },
  );
  useEffect(() => {
    // 로그인 체크
    if (token === null) {
      Router.push(`/login/${id}`);
    }
    refetch(); // 들어왔을때 query 실행
  }, []);

  return (
    <>
      {createMemoryBox ? (
        <MainWrapper>
          <RegisterLeft data={createMemoryBox} />
          <RegisterRight id={id} data={createMemoryBox} />
        </MainWrapper>
      ) : (
        <Loading />
      )}
    </>
  );
}
