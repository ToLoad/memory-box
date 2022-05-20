/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  BoxWrapper,
  ButtonContent,
  ButtonWrapper,
  ContentWrapper,
  LeftContent,
  RightContent,
} from './Mybox.style';
import BoxUserList from '../Userlist/BoxUserList';

import DdayButton from './DdayButton';
import ProgressBar from '../Main/ProgressBar';
import { IoIosArrowDown } from 'react-icons/io';
import { MdMoreVert } from 'react-icons/md';
import UserProfile from './UserProfile';
import { Tooltip } from '@mui/material';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from 'react-query';
import { putShowBox } from '../../api/box';
import { ButtonGroup } from './detailBox.style';

const Box = props => {
  const [modal, setModal] = useState(false);
  const today = new Date();
  const Dday = new Date(props.boxInfo.boxOpenAt.replace(/-/g, '/'));
  const distance = moment(Dday.getTime()) - moment(today.getTime());
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const StartDay = new Date(props.boxInfo.boxCreatedAt.replace(/-/g, '/'));
  const totalDayLenght = Dday.getTime() - StartDay.getTime();
  const queryClient = useQueryClient();

  const showBoxApi = useMutation(
    ['showbox', props.boxInfo.boxId],
    async () => {
      return putShowBox(props.boxInfo.boxId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('hidedata');
      },
    },
  );
  // 도착 날짜
  function getPercent() {
    const StartDay = new Date(props.boxInfo.boxCreatedAt.replace(/-/g, '/'));
    const Dday = new Date(props.boxInfo.boxOpenAt.replace(/-/g, '/'));
    const today = new Date();
    const distance = Dday.getTime() - today.getTime();
    if (today.getTime() > Dday.getTime()) {
      return 100;
    }
    const leftDay = ((totalDayLenght - distance) / totalDayLenght) * 100;
    const leftDayPer = Math.floor(leftDay);
    return leftDayPer;
  }

  function userSlice() {
    if (props.boxInfo.user.length > 4) {
      const userInfo = props.boxInfo.user.slice(0, 4);
      return (
        <>
          {userInfo.map((value, i) => {
            return <UserProfile value={value} />;
          })}
        </>
      );
    } else {
      return props.boxInfo.user.map((value, i) => {
        return <UserProfile value={value} />;
      });
    }
  }

  function headIcon() {
    // return <AiOutlinePlus />;
    return (
      <div
        className="toggleButton"
        onClick={e => {
          e.stopPropagation();
          props.nextToggle();
        }}
      >
        <IoIosArrowDown />
      </div>
    );
  }

  const showModal = e => {
    setModal(true);
    e.stopPropagation();
  };

  const handleCancel = e => {
    setModal(false);
    e.stopPropagation();
  };

  const handleModal = e => {
    e.stopPropagation();
  };

  function hideShowBox(e) {
    e.stopPropagation();
    if (props.categori === 4) {
      Swal.fire({
        title: '숨김 취소',
        text: '숨긴 기억함을 되돌리시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '되돌리기',
        cancelButtonText: '취소',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        preConfirm: () => {
          showBoxApi.mutate();
        },
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '돌아갔어요!',
            text: "기억함이 원래 자리로 돌아갔어요! '나의상자' 에서 확인이 가능해요!",
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
        }
      });
    }
  }

  function hideShowButton() {
    // 숨겨진 조회의 경우 카테고리 넘버 4
    // 아닐 경우 숨기기 버튼이 보이고,
    // 숨겨진 상자 조회의 경우 보이기 버튼이 return 되어야한다,
    if (props.categori === 4) {
      return (
        <>
          <div className="state hide">
            <ButtonWrapper
              color="blue"
              onClick={e => {
                hideShowBox(e);
              }}
            >
              <ButtonContent>보이기</ButtonContent>
            </ButtonWrapper>
          </div>
          <DdayButton day={day} num={props.num} />
        </>
      );
    }
    return (
      <div className="state">
        <div className="day">{props.boxInfo.boxOpenAt.slice(0, 10)}</div>
        <DdayButton day={day} num={props.num} />
      </div>
    );
  }

  return (
    <BoxWrapper
      click={props.click}
      firstClick={props.firstClick}
      num={props.num}
    >
      <div
        className={props.click ? 'off' : 'on'}
        onClick={() => props.set(props.num)}
      >
        <ContentWrapper>
          <LeftContent num={props.num} />
          <RightContent>
            <div className="contentGroup">
              <p>{props.boxInfo.boxName}</p>
            </div>
            <div className="dayGroup">
              {headIcon()}
              <ButtonGroup>
                {/* <div className="state">
                  <div className="day">
                    {props.boxInfo.boxOpenAt.slice(0, 10)}
                  </div>
                  <DdayButton day={day} num={props.num} />
                </div> */}
                {hideShowButton()}
              </ButtonGroup>
              <div className="user" onClick={e => handleModal(e)}>
                {userSlice()}
                <Tooltip title="유저 더보기" placement="top">
                  <div className="plusButton">
                    <MdMoreVert onClick={e => showModal(e)} />
                  </div>
                </Tooltip>
                <Modal
                  title="유저목록"
                  visible={modal}
                  onCancel={e => handleCancel(e)}
                  footer={null}
                >
                  <BoxUserList
                    user={props.boxInfo.user}
                    value={props.boxInfo}
                  />
                </Modal>
              </div>
            </div>
          </RightContent>
        </ContentWrapper>

        <ProgressBar percent={getPercent()} />
      </div>
    </BoxWrapper>
  );
};

export default Box;
