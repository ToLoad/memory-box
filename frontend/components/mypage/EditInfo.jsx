import React, { useState } from 'react';
import {
  EditWrapper,
  EditContent,
  Block,
  Blank,
  ContentDiv,
  ContentMain,
  ContentFooter,
  Warning,
  CreateToggle,
  ProfileImgContent,
} from './Editinfo.style';
import { Switch } from 'antd';
import 'antd/dist/antd.css';

export default function EditInfo() {
  const [checked, setChecked] = useState(false);
  const [imgurl, setImgurl] = useState('/혼구리2.png');
  const [firstImg, setFirstImg] = useState('/혼구리2.png');
  const [accountToggle, setAccountToggle] = useState(false);

  const onChangeToggle = () => {
    setChecked(!checked);
  };

  const saveFileImage = e => {
    console.log(e.target.files[0], '파일');
    if (e.target.files[0] === undefined) {
    } else {
      setImgurl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const DeleteAccountToggle = () => {
    setAccountToggle(!accountToggle);
  };

  return (
    <EditWrapper>
      <EditContent>
        <Block>
          <span>
            <h2>Profile Image</h2>
          </span>
          <ContentDiv>
            <ContentMain>
              <ProfileImgContent>
                <div className="img-container">
                  <p>My Avatar</p>
                  <img src={imgurl} alt="" />
                </div>

                <label className="button" htmlFor="input-file">
                  업로드
                </label>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: 'none' }}
                  onChange={e => saveFileImage(e)}
                  accept="image/*"
                />
              </ProfileImgContent>
            </ContentMain>
            <ContentFooter>
              <div className="button">등록</div>
            </ContentFooter>
          </ContentDiv>
        </Block>
        <Blank />
        <Block>
          <div className="container">
            <span>
              <h3>Delete Account</h3>
            </span>
            <CreateToggle>
              <Switch onChange={onChangeToggle} />
            </CreateToggle>
          </div>
          <ContentDiv>
            {checked ? (
              <>
                <ContentMain>
                  <p>
                    한번 탈퇴한 계정은 보유했던 추억함 및 모든 내역이
                    삭제됩니다.
                  </p>
                  <p>
                    탈퇴 이후 다시 가입하더라도, 이전 데이터를 복구할 수
                    없습니다.
                  </p>
                  <br />
                  <Warning>
                    <input
                      type="checkbox"
                      onClick={() => DeleteAccountToggle()}
                    />
                    <p>
                      본인은 위 사항에 대해 숙지 하였으며 위 선택을
                      <b>되돌릴 수 없음</b>을 확인하였습니다.
                    </p>
                  </Warning>
                </ContentMain>
                <ContentFooter>
                  <div
                    className={`button ${
                      accountToggle ? 'delete' : 'cant-delete'
                    }`}
                  >
                    {accountToggle ? '삭제' : '동의 후 삭제 가능합니다'}
                  </div>
                </ContentFooter>
              </>
            ) : null}
          </ContentDiv>
        </Block>
      </EditContent>
    </EditWrapper>
  );
}
