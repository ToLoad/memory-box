import React, { useEffect } from 'react';
import { JoinUserWrapper, JoinUserContent } from './JoinUser.style';
import KakaoLogin from './KakaoLogin';
import { SessionStorage } from '../../api';
import Router, { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getBox } from '../../api/box';

export default function JoinUserLogin(props) {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    SessionStorage.setItem('id', id);
  }, [id]);

  const { data: boxData, isLoading: boxDataLoading } = useQuery(
    ['boxData', id],
    async () => {
      return getBox(id);
    },
    {
      onSuccess: res => {
        console.log(res);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return (
    <JoinUserWrapper>
      <JoinUserContent>
        <h2>로그인</h2>
        <h2>부울경 2반의 추억여행</h2>
        <div className="content">
          <h3>
            부울경 2반의 추억여행 타임캡슐입니다. 이 타임캡슐은 10년 뒤 open 될
            예정입니다.
          </h3>
        </div>
        <KakaoLogin />
      </JoinUserContent>
      {/* <div style={{ marginBottom: '30px' }} /> */}
    </JoinUserWrapper>
  );
}
