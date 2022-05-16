import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBox } from '../api/box';
import { useQuery } from 'react-query';

const Wrapper = styled.div`
  position: relative;
  margin: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export default function AR({ lat, lot }) {
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

  function test() {
    alert('테스트트트트트트');
  }
  console.log(longitude, latitude, '메롱');
  return (
    <>
      <Wrapper>
        <a-scene
          onClick={() => {
            test();
          }}
          debug
          cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;"
          raycaster="objects: [gps-entity-place];"
          vr-mode-ui="enabled: false"
          // embedded
          arjs="sourceType: webcam;videoTexture: true; debugUIEnabled: false;"
        >
          <a-assets>
            <a-asset-item
              id="animated-asset"
              src="./assets/box.glb"
            ></a-asset-item>
          </a-assets>

          <a-entity
            // look-at="[gps-camera]"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"
            scale="0.5 0.5 0.5"
            gps-entity-place={`latitude: ${lat}; longitude: ${lot};`}
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
