import React from 'react';
import {
  ProfileCardWrapper,
  ProfileContent,
  UserInfo,
  ButtonContent,
} from './MyPage.style';
import { useRouter } from 'next/router';

export default function MyPage() {
  const router = useRouter();
  const gotoEdit = () => {
    router.push('/mypage/edit');
  };

  return (
    <ProfileCardWrapper>
      <ProfileContent>
        <UserInfo>
          <div className="img">
            <img src="/혼구리2.png" alt="" />
          </div>
          <div className="content">
            <p>name</p>
            <h1>박동준</h1>
            <p>nickname</p>
            <h3>weed</h3>
            <p>남은 캡슐 수</p>
            <h3>00개</h3>
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
        </ButtonContent>
      </ProfileContent>
    </ProfileCardWrapper>
  );
}
