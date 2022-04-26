/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MapContent = styled.div`
  width: 95%;
  /* height: ${props => props.heigth}; */
  height: 100%;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
`;

const Map = props => {
  // props으로 변경시켜주기
  const [mapLoaded, setMapLoaded] = useState(false);
  console.log(props.heigth);
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=7690e1a0798ed39f9d7dddf7f145f882&autoload=false`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);
    });
  }, [mapLoaded]);

  return <MapContent id="map" />;
};

export default Map;
