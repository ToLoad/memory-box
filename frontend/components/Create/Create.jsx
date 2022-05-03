import React, { useEffect, useState } from 'react';
import Router from 'next/router';
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
import { RiMapPinLine } from 'react-icons/ri';
import DaumPostcode from 'react-daum-postcode';
import { createMemoryBox } from '../../api/sumin';
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

  // 주소로 좌표얻기
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(mapScript);
    const onLoadKakao = () => {
      if (inputs.boxLocAddress != '') {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(inputs.boxLocAddress, result => {
            setInputs({
              ...inputs,
              boxLocLat: result[0].x,
              boxLocLng: result[0].y,
            });
          });
        });
      }
    };
    mapScript.addEventListener('load', onLoadKakao);
    return () => mapScript.removeEventListener('load', onLoadKakao);
  }, [inputs.boxLocAddress]);

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
    mutation.mutate(inputs, {
      onSuccess: data => {
        Router.push(`/register/${data.boxId}`);
      },
    });
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i += 1) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = current => {
    return current && current < moment().endOf('day');
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
    return;
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
    setInputs({ ...inputs, boxLocAddress: fullAddress });
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
          />
        </CreateItem>
        <CreateItem>
          <textarea
            placeholder="설명을 입력해주세요"
            name="boxDescription"
            onChange={onChange}
          />
        </CreateItem>
        <CreateDate>
          <DatePicker
            format="YYYY년 MM월 DD일 HH시"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment() }}
            placeholder="날짜를 입력해주세요"
            onChange={onChangeDate}
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
          <div>장소선택</div>
          <Switch onChange={onChangeToggle} />
        </CreateToggle>
        <CreateAddress state={checked}>
          <CreateItem onClick={showModal}>
            <input
              placeholder="주소를 입력해주세요"
              value={inputs.boxLocAddress}
              disabled
            />
            <RiMapPinLine className="create-address-icon" />
          </CreateItem>
          <CreateItem>
            <input
              type="text"
              placeholder="ex ) 우리아지트"
              name="boxLocName"
              onChange={onChange}
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
