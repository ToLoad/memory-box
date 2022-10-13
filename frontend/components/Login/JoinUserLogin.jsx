import React, { useEffect } from 'react';
import { JoinUserWrapper, JoinUserContent } from './JoinUser.style';
import KakaoLogin from './KakaoLogin';
import { LocalStorage } from '../../api';
import Router, { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getBox } from '../../api/box';
import Loading from '../Loading/Loading';

export default function JoinUserLogin(props) {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    LocalStorage.setItem('id', id);
  }, [id]);

  const { data: boxData, isLoading: boxDataLoading } = useQuery(
    ['boxData', id],
    async () => {
      return getBox(id);
    },
  );

  return (
    <JoinUserWrapper>
      <JoinUserContent>
        {boxData ? (
          <>
            <img className="img" src="/assets/images/하미.png" alt="" />
            <h2>로그인</h2>
            <h2>{boxData.boxName}</h2>
            <div className="content">
              <h4>
                {boxData.boxName} 기억함입니다.
                <br />
                <br />
                오픈 예정일 <br />
                {boxData.boxOpenAt.slice(0, 16)}
              </h4>
            </div>
            <KakaoLogin />
          </>
        ) : (
          <Loading />
        )}
      </JoinUserContent>
      {/* <div style={{ marginBottom: '30px' }} /> */}
    </JoinUserWrapper>
  );
}
