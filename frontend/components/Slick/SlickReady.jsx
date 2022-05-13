import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '../../styles/variables';
import { Footer, Header, ReadyCard, SlickBlock } from './Slick.style';
import Router, { useRouter } from 'next/router';
import {
  deleteReadyUserAPI,
  getReadyUserAPI,
  lockMemoryBoxAPI,
} from '../../api/ready';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { MdClose } from 'react-icons/md';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';

const settings = {
  dots: true,
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
  const [state, setState] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const deleteReadyUser = useMutation(deleteReadyUserAPI);
  const lockMemoryBox = useMutation(lockMemoryBoxAPI);
  useEffect(() => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (token === null) Router.push('/');
  }, []);
  const { data, isLoading, refetch } = useQuery(
    'getReadyUser',
    () => getReadyUserAPI(id),
    {
      refetchInterval: 2000,
      enabled: !!id,
      onSuccess: () => setState(true),
      onError: () => {
        Router.push('/');
      },
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
        Swal.fire({
          icon: 'success',
          title: '기억함을 묻었어요!',
        });
        Router.push('/mybox');
      },
    });
  };
  useEffect(() => {
    if (data) refetch();
  }, [data, refetch]);

  if (isLoading) {
    return <Loading />;
  }
  return state ? (
    <>
      <Header>
        <div>함께하는 멤버</div>
        <div>
          {data.closeBoxReadyCount}/{data.allUserCount}
        </div>
      </Header>
      <SlickBlock>
        <Slider {...settings}>
          {data.closeBoxReadyList.map(user => (
            <ReadyCard key={user.boxUserSeq} state={user.boxUserIsDone}>
              <div className="ready-card-block">
                {data.creator && data.userSeq !== user.userSeq && (
                  <MdClose
                    className="ready-card-close"
                    onClick={() => onClickCloseButton(user.boxUserSeq)}
                  />
                )}
                <div className="ready-card-profile">
                  <img src={user.userProfileImage} alt={user.userNickname} />
                </div>
                <div className="ready-card-name">{user.userNickname}</div>
              </div>
            </ReadyCard>
          ))}
        </Slider>
      </SlickBlock>
      <Footer>
        <Button onClick={() => Router.push('/mybox')}>목록가기</Button>
        {data.creator && data.closeBoxReadyCheck && (
          <Button onClick={onClickLockMemoryBox}>기억함 묻기</Button>
        )}
      </Footer>
    </>
  ) : (
    <Loading />
  );
}
