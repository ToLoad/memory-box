import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ARlat, ARlng, ARSeq } from '../store/atom';
import Router from 'next/router';
import { useMutation } from 'react-query';
import { postTreasure } from '../api/treasure';

const Wrapper = styled.div`
  display: flex;
  margin: 0;
  overflow: hidden;
  width: 800px;
  height: 900px;
`;

const BackBtn = styled.div`
  position: fixed;
  right: 20px;
  top: 10%;
  width: 80px;
  background-color: #ffebd2;
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #ffa53a;
    transition: 0.3s;
  }
`;
const TouchDes = styled.div`
  position: absolute;
  top: 75%;
  left: 35%;
  right: 35%;
  background-color: white;
  border: solid 1px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 100;
  font-weight: bold;
  font-size: 15px;
  @media ${props => props.theme.mobile} {
    left: 5%;
    right: 5%;
  }
  img {
    margin-right: 5px;
  }
`;

const PartyPopper = styled.img`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  object-fit: cover;
`;

export default function ar() {
  const arLat = useRecoilValue(ARlat);
  const arLng = useRecoilValue(ARlng);
  const arSeq = useRecoilValue(ARSeq);

  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setUserLat(lat);
        setUserLng(lon);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    }
  });

  const findTreasure = useMutation('postTreasure', async treasureSeq => {
    console.log(treasureSeq);
    return postTreasure(treasureSeq);
  });

  const backToTreasure = () => {
    Router.push('/treasure');
  };

  const openTreasure = () => {
    setIsOpen(true);
    findTreasure.mutate(arSeq);
  };

  return (
    <Wrapper>
      <a-scene
        cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
        raycaster="objects: [gps-entity-place];"
        vr-mode-ui="enabled: false"
        autoplay="false"
        arjs="sourceType: webcam;  debugUIEnabled: false;"
      >
              
        {arLat !== 0 && userLat !== 0 && (
          <>
            {isOpen ? (
              <a-entity
                animation-mixer="clip: *; loop: once; clampWhenFinished: true;"
                gltf-model="./assets/box_open.glb"
                scale="1 0.8 0.8"
                gps-entity-place={`latitude: ${arLat}; longitude: ${arLng};`}
              ></a-entity>
            ) : (
              <a-entity
                animation-mixer="loop: repeat"
                gltf-model="./assets/box.glb"
                scale="0.5 0.5 0.5"
                gps-entity-place={`latitude: ${arLat}; longitude: ${arLng};`}
                onClick={() => openTreasure()}
              ></a-entity>
            )}
          </>
        )}

        <a-camera
          gps-camera={`simulateLatitude: ${userLat}; simulateLongitude: ${userLng};`}
          rotation-reader
          wasd-controls="acceleration: 100"
        ></a-camera>
      </a-scene>

      <BackBtn onClick={() => backToTreasure()}>돌아가기</BackBtn>
      {isOpen ? (
        <>
          <PartyPopper src="/assets/images/party popper.gif" alt="" />
          <TouchDes>
            🎉 축하합니다 🎉 <br /> 기억함을 얻었습니다. 소중한 추억을
            담아보세요 !
          </TouchDes>
        </>
      ) : (
        <TouchDes>
          <img src="/assets/images/touch.gif" alt="touch" width="45px" />
          보물 상자를 터치하여 기억함을 획득하세요 !
        </TouchDes>
      )}
    </Wrapper>
  );
}
