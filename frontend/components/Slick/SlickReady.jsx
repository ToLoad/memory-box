import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '../../styles/variables';
import { ReadyCard, SlickBlock } from './Slick.style';
import Router, { useRouter } from 'next/router';
import {
  deleteReadyUserAPI,
  getReadyUserAPI,
  lockMemoryBoxAPI,
} from '../../api/sumin';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MdClose } from 'react-icons/md';
import Loading from '../Loading/Loading';

const settings = {
  infinite: false,
  speed: 500,
  fade: true,
  rows: 2,
  slidesPerRow: 3,
  responsive: [
    { breakpoint: 1024, settings: { rows: 2, slidesPerRow: 2 } },
    { breakpoint: 768, settings: { rows: 2, slidesPerRow: 1 } },
  ],
};
export default function SlickReady() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const deleteReadyUser = useMutation(deleteReadyUserAPI);
  const lockMemoryBox = useMutation(lockMemoryBoxAPI);
  useEffect(() => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (token === null) Router.push('/');
  }, []);
  const { data, isLoading } = useQuery(
    'getReadyUser',
    () => getReadyUserAPI(id),
    {
      enabled: !!id,
    },
  );
  const onClickCloseButton = seq => {
    deleteReadyUser.mutate(seq, {
      onSuccess: () => {
        queryClient.invalidateQueries('getReadyUser');
      },
    });
  };
  const onClickLockMemoryBox = () => {
    lockMemoryBox.mutate(id, {
      onSuccess: () => {
        alert('성공');
        Router.push('/mybox');
      },
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SlickBlock>
        <Slider {...settings}>
          {/* data map 사용 */}
          {data &&
            data.closeBoxReadyList.map(user => (
              <ReadyCard key={user.boxUserSeq}>
                <div className="ready-card-block">
                  {data.creator && (
                    <MdClose
                      className="ready-card-close"
                      onClick={() => onClickCloseButton(user.boxUserSeq)}
                    />
                  )}
                  <img src={user.userProfileImage} alt={user.userNickname} />
                  <div className="ready-card-name">{user.userNickname}</div>
                </div>
              </ReadyCard>
            ))}
        </Slider>
      </SlickBlock>
      {data && data.creator && data.closeBoxReadyCheck && (
        <Button onClick={onClickLockMemoryBox}>기억함 묻기</Button>
      )}
    </>
  );
}
