import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Router, { useRouter } from 'next/router';
import { BoxContainer, BoxContent, BoxHeader, BoxTextCard } from './Box.style';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Masonry from '@mui/lab/Masonry';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import BoxMap from './BoxMap';
import { getBoxMemoriesAPI } from '../../api/sumin';
import Loading from '../Loading/Loading';
import moment from 'moment';
import { Tooltip } from '@mui/material';

const colors = [
  'white',
  '#FFD9D9',
  '#FEFFBE',
  '#C0FFBB',
  '#BEFBFF',
  '#F2BEFF',
  '#FEBED9',
  '#CFCFCF',
];

export default function Box() {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('ACCESS_TOKEN');
    if (token == null) {
      Router.push('/');
    }
  }, []);

  const { data, isLoading } = useQuery(
    ['boxMemories', id],
    () => getBoxMemoriesAPI(id),
    {
      enabled: !!id,
      onSuccess: () => {
        setState(true);
      },
      onError: () => {
        Router.push('/');
      },
    },
  );

  const showModal = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };
  const showDataType = ({ type, value, color }) => {
    if (type === 1) {
      return (
        <BoxTextCard className="card-text" color={colors[color % 8]}>
          {value}
        </BoxTextCard>
      );
    }
    if (type === 2) {
      return <img src={value} alt="사진" />;
    }
    if (type === 3) {
      return (
        <video controls>
          <source src={value} type="video/mp4" />
        </video>
      );
    }
    return (
      <audio controls>
        <source src={value} type="audio/mp3" />
      </audio>
    );
  };
  if (isLoading) {
    return <Loading />;
  }
  return state ? (
    <BoxContainer>
      <BoxHeader>
        <div className="box-title">
          {data.boxName}
          {data.boxLocAddress && (
            <label>
              <FaMapMarkerAlt onClick={showModal} />
            </label>
          )}
        </div>
        <div className="box-date">
          <div>🔒 {moment(data.boxCreatedAt).format('YYYY.MM.DD HH시')}</div>
          <div>🔑 {moment(data.boxOpenAt).format('YYYY.MM.DD HH시')}</div>
        </div>
      </BoxHeader>
      <BoxContent>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={4}
          className="box-content"
        >
          {data.memories.map((memory, i) => {
            return (
              <div key={i} className="box-content-card">
                <div className="box-content-card-user">
                  <Tooltip
                    disableFocusListener
                    title={memory.nickname}
                    placement="top"
                    arrow
                  >
                    <img src={memory.profile} alt={memory.nickname} />
                  </Tooltip>
                </div>
                {showDataType(memory)}
              </div>
            );
          })}
        </Masonry>
      </BoxContent>
      <Modal
        width="600px"
        visible={modal}
        onCancel={handleCancel}
        footer={null}
      >
        <BoxMap
          lat={data.boxLocLat}
          lng={data.boxLocLng}
          name={data.boxLocName}
        />
      </Modal>
    </BoxContainer>
  ) : (
    <Loading />
  );
}
