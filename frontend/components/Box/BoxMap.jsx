import React, { useEffect } from 'react';
import { BoxMapContainer } from './Box.style';

export default function BoxMap({ lat, lng, name }) {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
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
        const imageSize = new window.kakao.maps.Size(40, 40);
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
        const iwContent = `<div style="padding:10px;">${name}<br/></div>`;
        // iwPosition = new kakao.maps.LatLng(lat, lng);

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          // position: iwPosition,
          content: iwContent,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [lat, lng]);

  return <BoxMapContainer id="map" />;
}
