import React from 'react';
import styled from 'styled-components';
import { Button } from '../styles/variables';
import Link from 'next/link';

const NotPageContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  font-size: 30px;
  color: white;
  text-align: center;
  & > div {
    width: 100%;
  }
  .title {
    margin: 20px 0;
  }
`;
export default function NotPage() {
  return (
    <NotPageContainer>
      <div>
        <div className="title">존재하지 않는 페이지입니다.</div>
        <div>
          <Link href="/">
            <Button>메인으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </NotPageContainer>
  );
}
