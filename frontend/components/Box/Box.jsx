import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { BoxContainer, BoxContent, BoxHeader, BoxTextCard } from './Box.style';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Masonry from '@mui/lab/Masonry';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import BoxMap from './BoxMap';
import { getBoxMemories } from '../../api/sumin';
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
  const [modal, setModal] = useState(false);
  const { isLoading, data } = useQuery('getBoxMemorys', () =>
    getBoxMemories(8),
  );
  console.log(isLoading, data);
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
            <source src="" type="audio/mp3" />
          </audio>
        </div>
      );
    });
    return result;
  };
  return (
    <BoxContainer>
      <BoxHeader>
        <div className="box-title">
          자율 - 꾸러기수비대 모임 <FaMapMarkerAlt onClick={showModal} />
        </div>
        <div className="box-date">
          <div>🔒 2022.01.14 17시 00분</div>
          <div>🔑 2022.05.23 18시 00분</div>
        </div>
      </BoxHeader>
      <BoxContent>
        {/* <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={3}
          className="box-content"
        >
          {isLoading && showData()}
        </Masonry> */}
      </BoxContent>
      <Modal
        width="600px"
        visible={modal}
        onCancel={handleCancel}
        footer={null}
      >
        <BoxMap lat={33.450701} lng={126.570667} />
      </Modal>
    </BoxContainer>
  );
}
