import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ARlat, ARlng, ARSeq } from '../store/atom';
import Router from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
  width: 15%;
  background-color:  #ffebd2;
  border-radius: 10px;
  padding: 12px 15px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #ffa53a;
    transition: 0.3s;
  }
`
const TouchDes = styled.div`
  position: fixed;
  top: 80%;
  left: 15vw;
  background-color:  white;
  border: solid 1px;
  font-size: 15px;
  border-radius: 10px;
  padding: 12px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  z-index: 100;
`

export default function ar() {
  const arLat = useRecoilValue(ARlat);
  const arLng = useRecoilValue(ARlng);
  const arSeq = useRecoilValue(ARSeq);
  console.log(arLat, arLng, '받아온 좌표정보');

  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  const [boxFileUrl, setBoxFileUrl] = useState("./assets/box.glb");
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setUserLat(lat);
        setUserLng(lon);
        console.log("내 위치", lat, lon)
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    }
  }, []);

  const findTreasure = useMutation(
    'postTreasure',
    async treasureSeq => {
      console.log(treasureSeq)
      return postTreasure(treasureSeq);
    },
    {
      onSuccess: res => {
        console.log(res)
      },
    },
  );

  const backToTreasure = () => {
    Router.push('/treasure');
  }

  const openTreasure = () => {
    setBoxFileUrl("./assets/box_open.glb"); 
    setIsOpen(true);
    findTreasure.mutate(arSeq);
  }

  return (
    <>
      <head>
        <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
      </head>

      <Wrapper>
        <a-scene
          debug
          cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
          raycaster="objects: [gps-entity-place];"
          vr-mode-ui="enabled: false"
          autoplay="false"
          arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        >
          {arLat !== 0 && (
            <a-entity
              animation-mixer="loop: repeat"
              gltf-model={boxFileUrl}
              scale="0.5 0.5 0.5"
              gps-entity-place={`latitude: ${arLat}; longitude: ${arLng};`}
              onClick={() => openTreasure()}
            ></a-entity>
          )}
          {userLat !== 0 && (
            <a-camera
              gps-camera={`simulateLatitude: ${userLat}; simulateLongitude: ${userLng};`}
              rotation-reader
              wasd-controls="acceleration: 100"
            ></a-camera>
          )}
        </a-scene>

        <BackBtn
          onClick={() => backToTreasure()}
        >
          돌아가기
        </BackBtn>

        {isOpen ? (
          <TouchDes>
           🎉 축하합니다 ! 기억함을 얻었습니다 ! 
          </TouchDes>
        ) : (
          <TouchDes>
            <img src="/assets/images/touch.gif" alt="" width="50px" />
              보물 상자를 터치하여 기억함을 획득하세요 !
          </TouchDes>
        ) }

        
      </Wrapper>
    </>
  );
}
