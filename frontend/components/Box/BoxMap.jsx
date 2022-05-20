import React, { useEffect } from 'react';
import { BoxMapContainer } from './Box.style';

export default function BoxMap({ lat, lng, name }) {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const imageSrc = '/assets/images/icon.png';
      const imageSize = new window.kakao.maps.Size(80, 80);
      // const imageOption = { offset: new window.kakao.maps.Point(40, 40) };
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
          yAnchor: 3.1,
        });
      }
    });
  }, []);

  return <BoxMapContainer id="map" />;
}
