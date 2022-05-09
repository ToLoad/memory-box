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

const colors = [
  'white',
  'lightpink',
  'lightblue',
  'lightgreen',
  'lightcoral',
  'lightsalmon',
  'lightgray',
  'lightsteelblue',
  'lightyellow',
];

export default function Box() {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);

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
  const showData = () => {
    const result = data.memories.map((memory, i) => {
      if (memory.type === 1) {
        return (
          <div key={i} className="box-content-card">
            <div className="box-content-card-user">
              <img src={memory.profile} alt={memory.nickname} />
            </div>
            <BoxTextCard className="card-text" color={colors[i % 9]}>
              {memory.value}
            </BoxTextCard>
          </div>
        );
      }
      if (memory.type === 2) {
        return (
          <div key={i} className="box-content-card">
            <div className="box-content-card-user">
              <img src={memory.profile} alt={memory.nickname} />
            </div>
            <img src={memory.value} alt="사진" />
          </div>
        );
      }
      if (memory.type === 3) {
        return (
          <div key={i} className="box-content-card">
            <div className="box-content-card-user">
              <img src={memory.profile} alt={memory.nickname} />
            </div>
            <video controls>
              <source src={memory.value} type="video/mp4" />
            </video>
          </div>
        );
      }
      return (
        <div key={i} className="box-content-card">
          <div className="box-content-card-user">
            <img src={memory.profile} alt={memory.nickname} />
          </div>
          <audio controls>
            <source src={memory.value} type="audio/mp3" />
          </audio>
        </div>
      );
    });
    return result;
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <BoxContainer>
      {data && (
        <BoxHeader>
          <div className="box-title">
            {data.boxName}
            {data.boxLocAddress && <FaMapMarkerAlt onClick={showModal} />}
          </div>
          <div className="box-date">
            <div>🔒 {moment(data.boxCreatedAt).format('YYYY.MM.DD HH시')}</div>
            <div>🔑 {moment(data.boxOpenAt).format('YYYY.MM.DD HH시')}</div>
          </div>
        </BoxHeader>
      )}
      <BoxContent>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={3}
          className="box-content"
        >
          {data && showData()}
        </Masonry>
      </BoxContent>
      <Modal
        width="600px"
        visible={modal}
        onCancel={handleCancel}
        footer={null}
      >
        {data && (
          <BoxMap
            lat={data.boxLocLat}
            lng={data.boxLocLng}
            name={data.boxLocName}
          />
        )}
      </Modal>
    </BoxContainer>
  );
}
