import React, { useEffect } from 'react';
import { BoxMapContainer } from './Box.style';

export default function BoxMap({ lat, lng }) {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=7690e1a0798ed39f9d7dddf7f145f882&autoload=false`;
    document.head.appendChild(mapScript);
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const imageSrc =
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png';
        const imageSize = new window.kakao.maps.Size(50, 50);
        const imageOption = { offset: new window.kakao.maps.Point(27, 60) };
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        );
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [lat, lng]);

  return <BoxMapContainer id="map" />;
}
