import React, { useState } from 'react';
import {
  ProfileCardWrapper,
  ProfileContent,
  UserInfo,
  ButtonContent,
} from './MyPage.style';
import { useRouter } from 'next/router';
import { useQueries, useQuery } from 'react-query';
import { getUserInfo } from '../../api/user';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import Loading from '../Loading/Loading';
import HideBoxList from './HideBoxList';

export default function MyPage() {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const gotoEdit = () => {
    router.push('/mypage/edit');
  };

  const { data, isLoading } = useQuery('userInfo', async () => {
    return getUserInfo();
  });

  if (isLoading) {
    return <Loading />;
  }

  const showModal = e => {
    setModal(true);
    e.stopPropagation();
  };

  const handleCancel = e => {
    setModal(false);
    e.stopPropagation();
  };

  console.log(data, '데이터');
  return (
    <ProfileCardWrapper>
      <ProfileContent>
        {data ? (
          <>
            <UserInfo>
              <div className="img">
                {/* <img src="/혼구리2.png" alt="" /> */}
                <img src={data.userProfileImage} alt="" />
              </div>
              <div className="content">
                <p>name</p>
                <h1>박동준</h1>
                {/* <p>nickname</p>
                <h3>weed</h3> */}
                <p>남은 캡슐 수</p>
                <h3>{data.userBoxRemain}개</h3>
              </div>
            </UserInfo>
            <ButtonContent>
              <div
                className="editprofile"
                onClick={() => {
                  gotoEdit();
                }}
              >
                Edit profile
              </div>
              <div
                className="editprofile"
                style={{ backgroundColor: 'blue', color: 'white' }}
                onClick={e => showModal(e)}
              >
                숨긴 기억함 보기!
              </div>
            </ButtonContent>
            <Modal
              title="숨겨진 기억함"
              visible={modal}
              onCancel={e => handleCancel(e)}
              footer={null}
            >
              <HideBoxList />
            </Modal>
          </>
        ) : null}
      </ProfileContent>
    </ProfileCardWrapper>
  );
}
