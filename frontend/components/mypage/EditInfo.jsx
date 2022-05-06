import React, { useEffect, useState } from 'react';
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
import AWSs3Upload from '../Register/AWSs3Upload';
import { useQuery, useMutation } from 'react-query';
import { getUserInfo, deleteMyInfo } from '../../api/user';
import { Tooltip } from '@mui/material';

// import AWS from 'aws-sdk';

const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const REGION = process.env.NEXT_PUBLIC_UPLOAD_REGION;
const BUCKET = process.env.NEXT_PUBLIC_UPLOAD_BUCKET;

export default function EditInfo() {
  const [checked, setChecked] = useState(false);
  const [imgurl, setImgurl] = useState('');
  // const [firstImg, setFirstImg] = useState('/혼구리2.png');
  const [accountToggle, setAccountToggle] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [putButton, setPutButton] = useState(false);

  const { data, isLoading } = useQuery(
    'userInfo',
    async () => {
      return getUserInfo();
    },
    {
      onSuccess: res => {
        console.log(res, '에딧창');
        setImgurl(res.userProfileImage);
      },
    },
  );

  const deleteUserApi = useMutation(
    'deleteUser',
    async () => {
      return deleteMyInfo();
    },
    {
      onSuccess: res => {
        console.log(res, '회원탈퇴 성공');
      },
      onError: err => {
        console.log(err, '회원탈퇴 에러');
      },
    },
  );

  if (isLoading) {
    return <>하이</>;
  }

  // console.log(selectedFile.length, '선택파일');

  const changeFileImage = e => {
    console.log(e.target.files, '파일');
    if (e.target.files[0] === undefined) {
    } else {
      console.log(e.target.files[0]);
      setSelectedFile(e.target.files);
      setImgurl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const DeleteAccountToggle = () => {
    setAccountToggle(!accountToggle);
  };

  const onChangeToggle = () => {
    setChecked(!checked);
    setAccountToggle(false);
  };

  const deleteUser = () => {
    console.log('유저삭제띠');
  };

  // useEffect(() => {
  //   console.log('selectedFile 변경됨');
  // }, [selectedFile]);

  // eslint-disable-next-line consistent-return
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
                  {/* {firstImg ? <img src={firstImg} } */}
                  {imgurl ? (
                    <img src={imgurl} alt="" />
                  ) : (
                    <img src={data.userProfileImage} alt="" />
                  )}
                </div>

                <label className="button" htmlFor="input-file">
                  업로드
                </label>
                <input
                  type="file"
                  id="input-file"
                  style={{ display: 'none' }}
                  onChange={e => changeFileImage(e)}
                  accept="image/*"
                />
              </ProfileImgContent>
            </ContentMain>
            <ContentFooter>
              {imgurl === '' ? (
                <Tooltip title="사진을 등록 해 주세요!" placement="top" arrow>
                  <div className="button" style={{ backgroundColor: 'black' }}>
                    등록전
                  </div>
                </Tooltip>
              ) : (
                <div>
                  {selectedFile.length > 0 && (
                    <AWSs3Upload type="image" file={selectedFile} />
                  )}
                </div>
              )}
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
                  {accountToggle ? (
                    <div className="button delete" onClick={() => deleteUser()}>
                      삭제
                    </div>
                  ) : (
                    <div className="button cant-delete">
                      동의 후 삭제 가능합니다.
                    </div>
                  )}
                </ContentFooter>
              </>
            ) : null}
          </ContentDiv>
        </Block>
      </EditContent>
    </EditWrapper>
  );
}
