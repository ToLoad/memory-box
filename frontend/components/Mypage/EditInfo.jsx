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
  BackButton,
} from './Editinfo.style';
import { Switch } from 'antd';
import 'antd/dist/antd.css';
import AWSs3Upload, { getExtension } from '../Register/AWSs3Upload';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUserInfo, deleteMyInfo } from '../../api/user';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Router from 'next/router';
import { BASE_URL } from '../../utils/contants';
import Loading from '../Loading/Loading';
import { v4 as uuidv4 } from 'uuid';
import { SessionStorage } from '../../api';
import axios from 'axios';
import { MdArrowBackIosNew } from 'react-icons/md';

const JWTapiClient = axios.create({
  baseURL: 'https://memory-box.kr/api/',
  headers: {
    'Content-type': 'application/json',
    Authorization: `${SessionStorage.getItem('ACCESS_TOKEN')}`,
  },
});
// import AWS from 'aws-sdk';

const postMyInfoChange = async imgUrl => {
  const response = await JWTapiClient.put(`user`, {
    imgUrl,
  });
  return response.data;
};

export default function EditInfo() {
  const [checked, setChecked] = useState(false);
  const [imgurl, setImgurl] = useState('');
  // const [firstImg, setFirstImg] = useState('/혼구리2.png');
  const [accountToggle, setAccountToggle] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [putButton, setPutButton] = useState(false);
  const queryClient = useQueryClient();
  const [uploadLoading, setUploadLoading] = useState(false);

  const [uuid, setUuid] = useState([]);

  const {
    data,
    isLoading,
    refetch: userInforefetch,
  } = useQuery(
    'editInfo',
    async () => {
      const response = await JWTapiClient.get(`user`);
      return response.data;
    },
    {
      retry: 8,
      retryDelay: 1000,
    },
  );

  const userInfoUpdate = useMutation(
    'uploadImg',
    async imgURL => {
      // console.log(typeof imgURL, 'api 요청의 url');
      // const response = await JWTapiClient.put(`user`, { imgURL });
      // return response.data;
      return postMyInfoChange(imgURL);
    },
    {
      onSuccess: res => {
        queryClient.resetQueries('profileInfo');
        userInforefetch();
        // queryClient.invalidateQueries('userInfo');
        console.log(res);
        setUploadLoading(true);
        setTimeout(() => {
          Router.push('/mypage');
        }, 2000);
      },
    },
  );

  const deleteUserApi = useMutation('deleteUser', async () => {
    const response = await JWTapiClient.delete(`user`);
    return response.data;
  });

  if (isLoading) {
    return <>하이</>;
  }

  if (uploadLoading) {
    return <Loading />;
  }

  // console.log(selectedFile.length, '선택파일');

  const changeFileImage = e => {
    if (e.target.files[0] === undefined) {
    } else {
      if (e.target.files[0].size > 3145728) {
        // profile image
        alert('프로필 이미지는 3mb 까지 업로드 할 수 있습니다.');
        return;
      }
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
    Swal.fire({
      title: '회원 탈퇴',
      text: '정말로 탈퇴하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '탈퇴하기',
      cancelButtonText: '취소하기',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      preConfirm: () => {
        deleteUserApi.mutate();
      },
    }).then(result => {
      if (result.isConfirmed) {
        SessionStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/main';
        Swal.fire({
          title: '탈퇴되었습니다!',
          text: '기억:함(函)을 이용 해 주셔서 정말 감사합니다',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  function backtoProfile() {
    Router.push('/mypage');
  }

  function uploadFile() {
    const extension = getExtension(selectedFile[0]);
    const imageUUID = uuidv4();
    setUuid(uuid => [...uuid, `${imageUUID}.${extension}`]);
    setPutButton(true);
    const awsS3ImageUrl = `${BASE_URL}profile/${data.userSeq}/${imageUUID}.${extension}`;
    userInfoUpdate.mutate(awsS3ImageUrl);
  }

  // eslint-disable-next-line consistent-return
  return (
    <EditWrapper>
      <BackButton>
        <MdArrowBackIosNew
          onClick={() => {
            backtoProfile();
          }}
          style={{ cursor: 'pointer' }}
        />
      </BackButton>
      <EditContent>
        <Block>
          <div className="container">
            <span>
              <h2>
                프로필
                <br /> 이미지
              </h2>
            </span>
          </div>
          <ContentDiv>
            <ContentMain>
              <ProfileImgContent>
                <div className="img-container">
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
                // <Tooltip title="사진을 등록 해 주세요!" placement="top" arrow>
                //   <div className="button" style={{ backgroundColor: 'black' }}>
                //     등록전
                //   </div>
                // </Tooltip>
                <></>
              ) : (
                <div
                  className="button"
                  // style={{ backgroundColor: 'blue' }}
                  onClick={() => uploadFile()}
                >
                  {selectedFile.length > 0 && (
                    <AWSs3Upload
                      type={data.userSeq}
                      file={selectedFile}
                      putButton={putButton}
                      id="profile"
                      uuid={uuid}
                    />
                  )}
                  저장하기
                </div>
              )}
            </ContentFooter>
          </ContentDiv>
        </Block>
        <Blank />

        <Block>
          <div className="container">
            <span>
              <h3>회원 탈퇴 </h3>
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
                      회원탈퇴
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
