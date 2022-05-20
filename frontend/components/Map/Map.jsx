/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MapContent = styled.div`
  width: 95%;
  /* height: ${props => props.heigth}; */
  height: 85%;
  border-radius: 10px;
  /* margin: 0 auto; */
  color: black;
  margin-top: 20px;
  .overlay {
    border: 2.5px solid black;
    border-radius: 10px;
    background-color: white;
    padding: 5px 10px;
    text-align: center;
    font-weight: bold;
  }
  @media ${props => props.theme.mobile} {
    height: 78%;
    margin: 0 auto;
  }
`;

const Map = ({ lat, lng, boxid, name }) => {
  // props으로 변경시켜주기

  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    $script.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild($script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById(`map${boxid}`);
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      const imageSrc = '/assets/images/icon.png';
      const imageSize = new window.kakao.maps.Size(50, 50);
      // const imageOption = { offset: new window.kakao.maps.Point(27, 60) };
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        // imageOption,
      );
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(map);
      if (name) {
        const content = `<div class="overlay"><div>${name}</div></div>`;
        const position = new window.kakao.maps.LatLng(lat, lng);
        const customOverlay = new window.kakao.maps.CustomOverlay({
          map,
          position,
          content,
          yAnchor: 2.1,
        });
      }
    });
  }, [mapLoaded]);
  const id = `map${boxid}`;

  return <MapContent id={id} />;
};

export default Map;
