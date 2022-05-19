/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import TreasureGuide from './TreasureGuide';
import Loading from '../Loading/Loading';
import { useQuery } from 'react-query';
import { getTreasure } from '../../api/treasure';
import { useSetRecoilState } from 'recoil';
import { ARlat, ARlng, ARSeq } from '../../store/atom';
import Router from 'next/router';
import { MdGpsFixed } from 'react-icons/md';
import { BiQuestionMark } from 'react-icons/bi';
import { keyframes } from '@emotion/react';
import { Tooltip } from '@mui/material';
import { MapLoading } from './treasure.style';

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

  .icon {
    top: 10px;
    position: absolute;
    font-size: 22px;
    z-index: 10;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    box-shadow: 0px 0px 2px gray;
    &:hover {
      color: #ffa53a;
      transition: 0.3s;
    }
  }
  .center {
    right: 10px;
  }
  .question {
    right: 50px;
  }
`;

const AlertFade = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`;

const FarAlert = styled.div`
  position: fixed;
  right: 35%;
  left: 35%;
  top: 70%;
  background-color: white;
  border: solid 1px;
  font-size: 15px;
  border-radius: 10px;
  padding: 12px 15px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  z-index: 100;
  animation: ${AlertFade} 1s ease-in-out;
  @media ${props => props.theme.mobile} {
    left: 10%;
    right: 10%;
  }
`;
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

export default function TreasureMap({ mylat, mylon }) {
  const [mymap, setMymap] = useState();
  const [modal, setModal] = useState(false);
  const [guide, setGuide] = useState(false);
  const [centerlat, setCenterlat] = useState();
  const [centerlon, setCenterlon] = useState();
  const LatSet = useSetRecoilState(ARlat);
  const LngSet = useSetRecoilState(ARlng);
  const SeqSet = useSetRecoilState(ARSeq);
  const [isFar, setIsFar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMent, setLoadingMent] = useState('');
  const { data: location, isLoading } = useQuery(['treasure'], async () => {
    return getTreasure();
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setCenterlat(lat);
        setCenterlon(lon);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    }
  }, []);

  const ARmodal = value => {
    const dis = getDistanceFromLatLonInKm(
      mylat,
      mylon,
      value.LocLat,
      value.LocLot,
    );
    const meter = dis * 1000;

    if (meter <= 50) {
      LatSet(value.LocLat);
      LngSet(value.LocLot);
      SeqSet(value.seq);
      Router.push('/ar');
      // window.location.href = '/ar';
    } else {
      setIsFar(true);
      setTimeout(() => {
        setIsFar(false);
      }, 2500);
    }
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

  // 중심으로 이동시키는 함수
  const panTo = () => {
    var moveLatLon = new window.kakao.maps.LatLng(mylat, mylon);
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    setCenterlat(mylat);
    setCenterlon(mylon);
    mymap.panTo(moveLatLon);
  };

  // 맵 불러오기
  useEffect(() => {
    const Kakao = window.kakao;

    Kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new Kakao.maps.LatLng(centerlat, centerlon),
        level: 2,
      };

      const map = new window.kakao.maps.Map(container, options);
      setMymap(map);
    });
  }, [centerlat, centerlon]);

  // 위치 변화에 따라 marker 이동
  useEffect(() => {
    const Kakao = window.kakao;
    var marker;
    Kakao.maps.load(() => {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      const locPosition = new Kakao.maps.LatLng(mylat, mylon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      // 마커와 인포윈도우를 표시합니다

      displayMarker(locPosition);

      // 내 위치 받아오기
      function displayMarker(locPosition) {
        const imageSrc = '/assets/images/icon.png';
        const imageSize = new window.kakao.maps.Size(50, 50);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
        );
        // 마커를 생성합니다
        marker = new window.kakao.maps.Marker({
          map: mymap,
          position: locPosition,
          image: markerImage,
        });
        marker.setMap(mymap);
      }
    });

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [mylat, mylon, mymap]);

  useEffect(() => {
    const Kakao = window.kakao;
    var markers = [];
    Kakao.maps.load(() => {
      const locationMarkerImg =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const clusterer = new Kakao.maps.MarkerClusterer({
        map: mymap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 7, // 클러스터 할 최소 지도 레벨
      });

      if (location) {
        const markers = location.map(function (v, index) {
          const imgSize = new window.kakao.maps.Size(24, 35);
          const LocationMarkerImg = new Kakao.maps.MarkerImage(
            locationMarkerImg,
            imgSize,
          );
          const LocLat = v.treasureLocLng;
          const LocLot = v.treasureLocLat;
          const position = new Kakao.maps.LatLng(LocLat, LocLot);
          const seq = v.treasureSeq;
          const LocMarker = new Kakao.maps.Marker({
            position,
            image: LocationMarkerImg,
            clickable: true,
          });
          Kakao.maps.event.addListener(LocMarker, 'click', e =>
            ARmodal({ LocLat, LocLot, seq }),
          );
          return LocMarker;
        });
        clusterer.addMarkers(markers);
      }
    });

    function deleteLocMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    }

    return () => {
      deleteLocMarker();
    };
  }, [mymap, location, mylat, mylon]);

  return (
    <MapWrapper>
      {/* {loading && (
      <MapLoading>
      <img src="/assets/images/LandingSolo1.png" alt="" width="100%"/>
      {loadingMent}
    </MapLoading>
    )} */}
      <Tooltip title="현재 위치로 이동" placement="top" arrow>
        <div className="icon center" onClick={() => panTo()}>
          <MdGpsFixed />
        </div>
      </Tooltip>
      <Tooltip title="보물찾기란?" placement="top" arrow>
        <div
          className="icon question"
          onClick={() => {
            openGuide();
          }}
        >
          <BiQuestionMark />
        </div>
      </Tooltip>

      <Map id="map" />

      <Modal
        title="보물찾기 가이드"
        visible={guide}
        footer={null}
        onCancel={e => guideCancel(e)}
      >
        <TreasureGuide />
      </Modal>

      {isFar && <FarAlert>보물상자와의 거리가 너무 멀어요 😢</FarAlert>}
    </MapWrapper>
  );
}
