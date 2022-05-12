/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
import React, { useEffect, useState } from 'react';
import TreasureAR from './TreasureAR';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import TreasureGuide from './TreasureGuide';

const Map = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  @media ${props => props.theme.mobile} {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

const MapWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .center {
    position: absolute;
    font-size: 22px;
    right: 10px;
    top: 10px;
    background-color: red;
    z-index: 10;
  }

  .question {
    position: absolute;
    font-size: 22px;
    top: 10px;
    right: 60px;
    z-index: 10;
    background-color: blue;
  }
`;

const location = [
  {
    locate: 35.1403032,
    lonate: 129.1090968,
  },
  {
    locate: 35.1404132,
    lonate: 129.1092068,
  },
  {
    locate: 35.1405132,
    lonate: 129.1094068,
  },
  {
    locate: 35.1407132,
    lonate: 129.1097068,
  },
  {
    locate: 35.1404132,
    lonate: 129.1102068,
  },
  {
    locate: 35.1409132,
    lonate: 129.1092068,
  },
  {
    locate: 35.1410132,
    lonate: 129.1102068,
  },
];

function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

export default function TreasureMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mylat, setMylat] = useState();
  const [mylon, setMylon] = useState();
  const [mymap, setMymap] = useState();
  const [modal, setModal] = useState(false);
  const [guide, setGuide] = useState(false);
  // 마커 위치 정보
  const [markerLat, setMarkerLat] = useState();
  const [markerLon, setMarkerLon] = useState();
  const ARmodal = value => {
    console.log(value, '이벤트');
    setModal(true);
    setMarkerLat(value.LocLat);
    setMarkerLon(value.LocLot);
    console.log(markerLat, markerLon);
  };

  const handleCancel = e => {
    setModal(false);
  };

  const openGuide = () => {
    setGuide(true);
  };

  const guideCancel = e => {
    setGuide(false);
  };

  const noDistance = () => {
    alert('거리가 50미터 이내가 아닙니다!');
  };

  useEffect(() => {
    const Tscript = document.createElement('script');
    Tscript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    Tscript.addEventListener('load', () => setMapLoaded(true));
    document.head.appendChild(Tscript);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    const Kakao = window.kakao;

    Kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new Kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      setMymap(map);
      const imageSrc = '/assets/images/icon.png';
      const imageSize = new window.kakao.maps.Size(50, 50);
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
      );

      // 내 위치 받아오기
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.watchPosition(function (position) {
          var lat = position.coords.latitude; // 위도
          var lon = position.coords.longitude; // 경도
          setMylat(lat);
          setMylon(lon);
          var locPosition = new Kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition);
        });
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        var locPosition = new Kakao.maps.LatLng(33.450701, 126.570667);
        var message = 'geolocation을 사용할수 없어요..';

        displayMarker(locPosition);
      }
      // 내 위치 받아오기
      function displayMarker(locPosition) {
        const imageSrc = '/assets/images/icon.png';
        const imageSize = new window.kakao.maps.Size(50, 50);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
        );
        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          map,
          position: locPosition,
          image: markerImage,
        });

        // 인포윈도우에 표시할 내용

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
      }

      function panTo() {
        // 이동할 위도 경도 위치를 생성합니다
        var moveLatLon = new Kakao.maps.LatLng(mylat, mylon);
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        map.panTo(moveLatLon);
      }

      const center = document.querySelector('.center');
      center.addEventListener('click', () => panTo());
      // marker.setMap(map);
      // -- 받아온 위치 정보에 따른 마커 등록하기

      const locationMarkerImg =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

      const imgSize = new Kakao.maps.Size(50, 50);

      for (let i = 0; i < location.length; i++) {
        // 이미지 사이즈 지정
        const imgSize = new window.kakao.maps.Size(24, 35);
        const LocationMarkerImg = new Kakao.maps.MarkerImage(
          locationMarkerImg,
          imgSize,
        );

        const LocLat = location[i].locate;
        const LocLot = location[i].lonate;
        const position = new Kakao.maps.LatLng(LocLat, LocLot);

        const LocMarker = new Kakao.maps.Marker({
          map,
          position,
          image: LocationMarkerImg,
          clickable: true,
        });

        LocMarker.setMap(map);

        const dis = getDistanceFromLatLonInKm(mylat, mylon, LocLat, LocLot);
        const meter = dis * 1000;
        console.log(
          '마커와 내 위치사이의 거리는 : ',
          meter,
          '미터',
          mylat,
          mylon,
        );
        if (meter <= 50) {
          // 만약 내 위치와 좌표사이의 거리가 50미터 이내라면
          // 모달창을 띄워주고
          console.log('50이내');
          Kakao.maps.event.addListener(LocMarker, 'click', e =>
            ARmodal({ LocLat, LocLot }),
          );
        } else {
          console.log('50미터 밖');
          // 50미터 밖이라면?
          Kakao.maps.event.addListener(LocMarker, 'click', e => noDistance());
        }
      }
    });
  }, [mapLoaded, mylat, mylon]);

  return (
    <MapWrapper>
      <div className="center">하잉</div>
      <div
        className="question"
        onClick={() => {
          openGuide();
        }}
      >
        ???
      </div>
      <Map id="map" />

      {modal ? (
        <TreasureAR
          lat={markerLat}
          lot={markerLon}
          cancel={() => {
            handleCancel();
          }}
          modal={modal}
        />
      ) : null}

      <Modal
        title="보물찾기 가이드"
        visible={guide}
        footer={null}
        onCancel={e => guideCancel(e)}
      >
        <TreasureGuide />
      </Modal>
    </MapWrapper>
  );
}
