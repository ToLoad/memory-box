import React, { useState } from 'react';
import { MdPerson, MdGroups } from 'react-icons/md';
import {
  CreateBlock,
  CreateItem,
  CreateDate,
  CreatePerson,
  CreateToggle,
  CreateAddress,
} from './Create.style';
import { DatePicker, Switch, Modal } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Button } from '../../styles/variables';
import { RiMapPinLine } from 'react-icons/ri';
import DaumPostcode from 'react-daum-postcode';

export default function Create() {
  const [selected, setSelected] = useState(0);
  const [checked, setChecked] = useState(false);
  const [address, setAddress] = useState('');
  const [modal, setModal] = useState(false);
  // const [inputs, setInputs] = useState({
  //   artistName: '',
  //   artistCompany: '',
  //   artistGenre: '',
  //   imageUri: '',
  //   description: '',
  //   realName: '',
  //   account: '',
  //   bank: '',
  // });

  // const {
  //   artistName,
  //   artistCompany,
  //   artistGenre,
  //   imageUri,
  //   description,
  //   realName,
  //   account,
  //   bank,
  // } = inputs;

  // const onChange = e => {
  //   setInputs({
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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

  const disabledDateTime = () => {
    return {
      disabledHours: () => range(0, moment().hour()),
      disabledMinutes: () => range(0, moment().minute()),
    };
  };

  const clickCreatePerson = num => {
    setSelected(num);
  };

  const onChangeToggle = () => {
    setChecked(!checked);
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
    setAddress(fullAddress);
    handleCancel();
  };

  return (
    <>
      <CreateBlock>
        <div className="create-title">기억함 만들기</div>
        <CreateItem>
          <input type="text" placeholder="제목을 입력해주세요" />
        </CreateItem>
        <CreateItem>
          <textarea placeholder="설명을 입력해주세요" />
        </CreateItem>
        <CreateDate>
          <DatePicker
            format="YYYY년 MM월 DD일 HH시 mm분"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: moment() }}
            placeholder="날짜를 입력해주세요"
          />
        </CreateDate>

        <CreateItem className="create-person">
          <CreatePerson
            onClick={() => clickCreatePerson(1)}
            selected={selected === 1}
          >
            <MdPerson />
            혼자 담기
          </CreatePerson>
          <CreatePerson
            onClick={() => clickCreatePerson(2)}
            selected={selected === 2}
          >
            <MdGroups />
            함께 담기
          </CreatePerson>
        </CreateItem>
        <CreateToggle>
          <div>장소선택</div>
          <Switch onChange={onChangeToggle} />
        </CreateToggle>
        <CreateAddress>
          <CreateItem
            onClick={showModal}
            className={`create-address${
              checked ? ' create-address-checked' : ' create-address-unchecked'
            }`}
          >
            <input placeholder="주소를 입력해주세요" value={address} disabled />
            <RiMapPinLine className="create-address-icon" />
          </CreateItem>
        </CreateAddress>
        <CreateItem>
          <Button>기억함 만들기</Button>
        </CreateItem>
      </CreateBlock>
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
    </>
  );
}
