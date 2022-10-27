import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Footer, Header, OpenCard, OpenImage, SlickBlock } from './Slick.style';
import Router, { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  changeOpenUserAPI,
  getOpenUserAPI,
  unlockMemoryBoxAPI,
} from '../../api/ready';
import Loading from '../Loading/Loading';
import { Button } from '../../styles/variables';
import Swal from 'sweetalert2';

const settings = {
  dots: true,
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
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token === null) Router.push('/');
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        Router.push(`/box/${id}`);
      }, 3000);
    }
  }, [id, open]);

  const queryClient = useQueryClient();
  const changeOpenUser = useMutation(changeOpenUserAPI);
  const unlockMemoryBox = useMutation(unlockMemoryBoxAPI);
  const onClickUnlockMemoryBox = () => {
    unlockMemoryBox.mutate(id, {
      onSuccess: () => {
        Swal.fire({
          title: '기억함 열기',
          imageUrl: '/assets/images/closeBox.png',
          imageWidth: 200,
          showCloseButton: true,
        }).then(result => {
          if (result.isConfirmed) {
            setOpen(true);
          }
        });
      },
    });
  };
  const onClickchangeOpenUser = () => {
    changeOpenUser.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('getOpenUser');
        Swal.fire({
          icon: 'success',
          title: '기억함을 열 준비가 되었습니다!',
        });
      },
    });
  };
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const deg2rad = deg => {
      return deg * (Math.PI / 180);
    };
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };
  const checkLocation = (lat2, lng2) => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const dist = getDistance(lat2, lng2, lat, lng);
      if (dist < 0.5) {
        onClickchangeOpenUser();
      } else {
        Swal.fire({ title: '너무 멀리 있습니다.', text: '다시 시도해주세요' });
      }
    });
  };
  const { data, isLoading, refetch } = useQuery(
    ['getOpenUser', id],
    () => getOpenUserAPI(id),
    {
      refetchInterval: 2000,
      enabled: !!id,
      onSuccess: d => {
        if (!state) {
          if (!d.isCome) {
            if (d.boxLatitude === 0 && d.boxLongitude === 0) {
              onClickchangeOpenUser();
            } else {
              checkLocation(d.boxLatitude, d.boxLongitude);
            }
          }
          setState(true);
        }
      },
      onError: () => {
        Router.push('/');
      },
    },
  );
  useEffect(() => {
    if (data) refetch();
  }, [data, refetch]);

  if (isLoading) {
    return <Loading />;
  }
  return state ? (
    <>
      {open ? (
        <OpenImage>
          <div>
            <img src="/assets/images/open.gif" alt="open" />
          </div>
        </OpenImage>
      ) : (
        <>
          <Header>
            <div>
              기억함 오픈 대기중...
              <label>
                {data.openBoxReadyCount}/{data.allUserCount}
              </label>
            </div>
          </Header>
          <SlickBlock>
            <Slider {...settings}>
              {data.openBoxReadyList.map(user => (
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
          <Footer>
            <Button onClick={() => Router.push('/mybox')}>목록가기</Button>
            {data.isCome ? (
              data.openBoxReadyCheck && (
                <Button onClick={onClickUnlockMemoryBox}>기억함 열기</Button>
              )
            ) : (
              <Button
                className="open-ready-button"
                onClick={() =>
                  checkLocation(data.boxLatitude, data.boxLongitude)
                }
              >
                준비하기
              </Button>
            )}
          </Footer>
        </>
      )}
    </>
  ) : (
    <Loading />
  );
}
