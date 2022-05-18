import React from 'react';
import UserProfile from '../Mybox/UserProfile';

import {
  UserListWrapper,
  UserListContent,
  UserListContentWrapper,
} from './UserList';

export default function BoxUserList(props) {
  return (
    <UserListWrapper>
      <h1>{props.value.boxName}</h1>
      <p>{props.value.boxDescription}</p>
      <div className="userLength">
        <h2>{props.user.length}명</h2>
        <h3>의 친구들이 추억을 기다리고있어요!</h3>
      </div>
      <UserListContentWrapper>
        {props.user.map((value, i) => {
          return (
            <UserListContent>
              <div className="imgBox">
                <UserProfile value={value} />
              </div>
              <div className="text">
                {/* <p>이름</p> */}
                {value.userNickname.length > 7 ? (
                  <h3> {value.userNickname.slice(0, 7)}..</h3>
                ) : (
                  <h3>{value.userNickname}</h3>
                )}
              </div>
            </UserListContent>
          );
        })}
      </UserListContentWrapper>
    </UserListWrapper>
  );
}
