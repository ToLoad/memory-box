import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBox } from '../api/box';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { ARlat, ARlng } from '../store/atom';

const Wrapper = styled.div`
  margin: 0;
  overflow: hidden;
  width: 800px;
  height: 900px;
`;

export default function ar() {
  const LocLat = useRecoilValue(ARlat);
  const LocLng = useRecoilValue(ARlng);
  console.log(LocLat, LocLng, '받아온 좌표정보');

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.watchPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setLatitude(lat);
        setLongitude(lon);
      });
    }
  });

  return (
    <>
      <head>
        <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
        <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
        <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
        <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
      </head>
      <script src="/arScript.js"></script>

      <Wrapper>
        <a-scene
          debug
          cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
          raycaster="objects: [gps-entity-place];"
          vr-mode-ui="enabled: false"
          // embedded
          arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        >
          <a-assets>
            <a-asset-item
              id="animated-asset"
              src="./assets/magnemite/scene.gltf"
            ></a-asset-item>
          </a-assets>

          <a-entity
            look-at="[gps-camera]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            scale="0.5 0.5 0.5"
            gps-entity-place={`latitude: ${LocLat}; longitude: ${LocLng};`}
          ></a-entity>

          {longitude !== 0 && (
            <a-camera
              gps-camera={`simulateLatitude: ${latitude}; simulateLongitude: ${longitude};`}
              rotation-reader
              wasd-controls="acceleration: 100"
            ></a-camera>
          )}
        </a-scene>
      </Wrapper>
    </>
  );
}
