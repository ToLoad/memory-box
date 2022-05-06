import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Header, OpenCard, SlickBlock } from './Slick.style';
import Router, { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { getOpenUserAPI, unlockMemoryBoxAPI } from '../../api/sumin';
import Loading from '../Loading/Loading';
import { Button } from '../../styles/variables';

const settings = {
  infinite: false,
  speed: 500,
  fade: true,
  rows: 2,
  slidesPerRow: 4,
  responsive: [
    { breakpoint: 1024, settings: { rows: 2, slidesPerRow: 3 } },
    { breakpoint: 768, settings: { rows: 2, slidesPerRow: 2 } },
    { breakpoint: 480, settings: { rows: 2, slidesPerRow: 1 } },
  ],
};

export default function SlickOpen() {
  const router = useRouter();
  const { id } = router.query;
  const unlockMemoryBox = useMutation(unlockMemoryBoxAPI);
  const { data, isLoading } = useQuery(
    'getOpenUser',
    () => getOpenUserAPI(id),
    {
      enabled: !!id,
    },
  );
  useEffect(() => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (token === null) Router.push('/');
  }, []);

  const onClickUnlockMemoryBox = () => {
    unlockMemoryBox.mutate(id, {
      onSuccess: () => {
        alert('성공');
        Router.push(`/box/${id}`);
      },
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header>
        <div>대기중...</div>
        {data && (
          <div>
            {data.openBoxReadyCount}/{data.allUserCount}
          </div>
        )}
      </Header>
      <SlickBlock>
        <Slider {...settings}>
          {data &&
            data.openBoxReadyList.map(user => (
              <OpenCard
                key={user.userSeq}
                className="slick-card"
                come={user.boxUserIsCome}
              >
                <div className="open-card-profile">
                  <img src={user.userProfileImage} alt={user.userNickname} />
                </div>
                <div className="open-card-name">{user.userNickname}</div>
              </OpenCard>
            ))}
        </Slider>
      </SlickBlock>
      {data && data.openBoxReadyCheck && (
        <Button onClick={onClickUnlockMemoryBox}>기억함 열기</Button>
      )}
    </>
  );
}
