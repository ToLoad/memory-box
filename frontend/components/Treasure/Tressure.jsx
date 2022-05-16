import React, { useEffect, useState } from 'react';
import { TreasureWrapper, TreasureContent } from './treasure.style';
import TreasureMap from './TreasureMap';

export default function Tressure() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mylat, setMylat] = useState();
  const [mylon, setMylon] = useState();
  useEffect(() => {
    const Tscript = document.createElement('script');
    Tscript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    Tscript.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild(Tscript);
  }, []);

  // locate: 35.1403032,
  // lonate: 129.1090968,
  // 위치정보 받아오기
  // 중심 이동을 했을때만, 지도 중심 변경
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      console.log('실시간으로 내 위치를 받아오고 있습니다.');
      navigator.geolocation.watchPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setMylat(lat);
        setMylon(lon);
        // 마커와 인포윈도우를 표시합니다(
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      alert('위치정보를 받아올 수 없어요!! 다시 한번 시도 해 주세요!');
    }
  });

  function mylocationTest() {
    console.log('변경');
    setMylat(mylat + 0.001);
    setMylon(mylon + 0.001);
  }

  return (
    <TreasureWrapper>
      <div className="desktop">
        !! 보물찾기는 모바일 환경에 최적화 되어 있습니다.
      </div>
      {/* map이 들어갈 자리 */}
      <TreasureContent>
        {mapLoaded && mylat && mylon ? (
          <TreasureMap
            load={mapLoaded}
            mylat={mylat}
            mylon={mylon}
            mylocationTest={() => mylocationTest()}
          />
        ) : (
          <>위치정보를 사용할 수 없습니다</>
        )}
      </TreasureContent>
    </TreasureWrapper>
  );
}
