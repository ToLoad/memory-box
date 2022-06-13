import React, { useState } from 'react';
import Router from 'next/router';
import Swal from 'sweetalert2';
import { MdPerson, MdGroups } from 'react-icons/md';
import {
  CreateBlock,
  CreateItem,
  CreateDate,
  CreatePerson,
  CreateToggle,
  CreateAddress,
  CreateWrapper,
} from './Create.style';
import { DatePicker, Switch, Modal } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Button } from '../../styles/variables';
import DaumPostcode from 'react-daum-postcode';
import { createMemoryBox } from '../../api/register';
import { useMutation } from 'react-query';

export default function Create() {
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState({
    boxDescription: '',
    boxIsSolo: true,
    boxLocAddress: '',
    boxLocLat: null,
    boxLocLng: null,
    boxLocName: '',
    boxName: '',
    boxOpenAt: '',
  });

  // 기억함 생성하기
  const mutation = useMutation(createMemoryBox);

  const onChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDate = date => {
    const d = moment(date).format('YYYY-MM-DD HH:00:00');
    setInputs({ ...inputs, boxOpenAt: d });
  };

  const onChangePerson = state => {
    setInputs({ ...inputs, boxIsSolo: state });
  };

  const onChangeToggle = () => {
    setChecked(!checked);
  };

  const onClickCreateButton = () => {
    if (inputs.boxName === '') {
      Swal.fire('제목을 입력하세요');
    } else if (inputs.boxDescription === '') {
      Swal.fire('설명을 입력하세요');
    } else if (inputs.boxOpenAt === '') {
      Swal.fire('날짜를 입력하세요');
    } else if (checked && inputs.boxLocAddress === '') {
      Swal.fire('주소를 입력하세요');
    } else if (checked && inputs.boxLocName === '') {
      Swal.fire('주소이름을 입력하세요');
    } else {
      mutation.mutate(inputs, {
        onSuccess: data => {
          Swal.fire({
            icon: 'success',
            title: '기억함을 만들었어요!',
            text: '✨기억을 넣을 수 있어요✨',
          });
          Router.push(`/register/${data.boxId}`);
        },
      });
    }
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = current => {
    if (moment() < current && current <= moment('2023-04-30')) {
      return false;
    }
    return true;
  };

  const disabledDateTime = current => {
    if (
      current &&
      current.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    ) {
      return {
        disabledHours: () => range(0, moment().hour()),
      };
    }
    return {};
  };

  const showModal = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(fullAddress, result => {
        setInputs({
          ...inputs,
          boxLocAddress: fullAddress,
          boxLocLat: result[0].y,
          boxLocLng: result[0].x,
        });
      });
    });
    handleCancel();
  };
  return (
    <CreateWrapper>
      <CreateBlock>
        <div className="create-title">기억함 만들기</div>
        <CreateItem>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            name="boxName"
            onChange={onChange}
            maxLength="20"
          />
          {inputs.boxName.length > 0 && (
            <div className="create-length">{inputs.boxName.length}/20</div>
          )}
        </CreateItem>
        <CreateItem>
          <textarea
            placeholder="설명을 입력해주세요"
            name="boxDescription"
            onChange={onChange}
            maxLength="50"
          />
          {inputs.boxDescription.length > 0 && (
            <div className="create-length">
              {inputs.boxDescription.length}/50
            </div>
          )}
        </CreateItem>
        <CreateDate>
          <DatePicker
            format="YYYY-MM-DD HH시"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment() }}
            placeholder="배송 받을 날짜를 선택해주세요"
            onChange={onChangeDate}
            inputReadOnly
          />
        </CreateDate>
        <CreateItem className="create-person">
          <CreatePerson
            onClick={() => onChangePerson(true)}
            selected={inputs.boxIsSolo}
          >
            <MdPerson />
            혼자 담기
          </CreatePerson>
          <CreatePerson
            onClick={() => onChangePerson(false)}
            selected={!inputs.boxIsSolo}
          >
            <MdGroups />
            함께 담기
          </CreatePerson>
        </CreateItem>
        <CreateToggle>
          <div>위치 담기</div>
          <Switch onChange={onChangeToggle} />
          {checked && (
            <div className="create-address-text">
              등록된 위치에서만 기억함을 열 수 있습니다
            </div>
          )}
        </CreateToggle>
        <CreateAddress state={checked}>
          <CreateItem onClick={showModal}>
            <input placeholder="주소" value={inputs.boxLocAddress} />
          </CreateItem>
          <CreateItem>
            <input
              type="text"
              placeholder="위치 별칭 ex) 우리아지트"
              name="boxLocName"
              onChange={onChange}
              maxLength="30"
            />
          </CreateItem>
        </CreateAddress>
        <CreateItem state={checked}>
          <Button className="create-button" onClick={onClickCreateButton}>
            기억함 만들기
          </Button>
        </CreateItem>
      </CreateBlock>
      {/* 주소 모달 */}
      <Modal
        title="기억함 위치 지정하기"
        visible={modal}
        onCancel={handleCancel}
        footer={null}
      >
        <DaumPostcode
          style={{ height: '500px' }}
          onComplete={handleComplete}
          autoClose={false}
        />
      </Modal>
    </CreateWrapper>
  );
}
