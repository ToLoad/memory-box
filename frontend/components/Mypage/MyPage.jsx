import React, { useEffect, useState } from 'react';
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
import styled from 'styled-components';
import { SessionStorage } from '../../api';
import axios from 'axios';

const JWTapiClient = axios.create({
  baseURL: 'https://k6e201.p.ssafy.io/api/',
  headers: {
    'Content-type': 'application/json',
    Authorization: `${SessionStorage.getItem('ACCESS_TOKEN')}`,
  },
});

const ModalCover = styled.div`
  max-width: 700px;
  height: 70vh;
`;

export default function MyPage() {
  const [modal, setModal] = useState(false);
  // const [img, setImg] = useState('');
  const router = useRouter();
  const gotoEdit = () => {
    router.push('/mypage/edit');
  };

  const { data, isLoading, refetch } = useQuery(
    'profileInfo',
    async () => {
      const access = SessionStorage.getItem('ACCESS_TOKEN');
      console.log(access, 'api 요청에 들어오는 access token');
      const response = await JWTapiClient.get(`user`);
      return response.data;
    },
    {
      retry: 8,
      retryDelay: 1000,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

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

  return (
    <ProfileCardWrapper>
      <ProfileContent>
        {data ? (
          <>
            <UserInfo>
              <div className="img">
                <img src={data.userProfileImage} alt="" />
              </div>
              <div className="content">
                <p>name</p>
                <h1>{data.userNickname}</h1>
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
