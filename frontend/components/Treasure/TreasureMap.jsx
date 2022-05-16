/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
import React, { useEffect, useState } from 'react';
import TreasureAR from './TreasureAR';
import { Modal } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import TreasureGuide from './TreasureGuide';
import Loading from '../Loading/Loading';
import { useQuery } from 'react-query';
import { getTreasure } from '../../api/treasure';

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

// const location = [
//   {
//     locate: 35.1403032,
//     lonate: 129.1090968,
//   },
//   {
//     locate: 35.1404132,
//     lonate: 129.1092068,
//   },
//   {
//     locate: 35.1405132,
//     lonate: 129.1094068,
//   },
//   {
//     locate: 35.1407132,
//     lonate: 129.1097068,
//   },
//   {
//     locate: 35.1404132,
//     lonate: 129.1102068,
//   },
//   {
//     locate: 35.1409132,
//     lonate: 129.1092068,
//   },
//   {
//     locate: 35.1410132,
//     lonate: 129.1102068,
//   },
// ];

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

export default function TreasureMap({ load, mylat, mylon, mylocationTest }) {
  // const [mylat, setMylat] = useState(35.3303324);
  // const [mylon, setMylon] = useState(129.0398025);
  const [mymap, setMymap] = useState();
  const [modal, setModal] = useState(false);
  const [guide, setGuide] = useState(false);
  const [centerlat, setCenterlat] = useState();
  const [centerlon, setCenterlon] = useState();
  // 마커 위치 정보
  const [markerLat, setMarkerLat] = useState();
  const [markerLon, setMarkerLon] = useState();
  const [flag, setFlag] = useState(false);
  const [myMarker, setMarker] = useState();

  const { data: location, isLoading } = useQuery(
    ['treasure', mylat, mylon],
    async () => {
      return getTreasure();
    },
    {
      onSuccess: res => {
        console.log(res, '보물 성공');
      },
      onError: err => {
        console.log(err, '에러');
      },
    },
  );

  // if (load === false) {
  //   return <Loading />;
  // }
  if (location) {
    console.log(location, '정보');
  }
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      console.log('내 위치를 받아오고있습니다');
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
      console.log(mylat, mylon);
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

      const closedmarkerImg = '/assets/images/하미.png';
      if (location) {
        console.log('지역정보');
        for (let i = 0; i < location.length; i++) {
          // 이미지 사이즈 지정
          const imgSize = new window.kakao.maps.Size(24, 35);
          const LocationMarkerImg = new Kakao.maps.MarkerImage(
            locationMarkerImg,
            imgSize,
          );

          const ClosedMarkerImg = new Kakao.maps.MarkerImage(
            closedmarkerImg,
            imgSize,
          );

          const LocLat = location[i].treasureLocLng;
          const LocLot = location[i].treasureLocLat;
          const position = new Kakao.maps.LatLng(LocLat, LocLot);

          console.log(mylat, mylon, '내위치');
          const dis = getDistanceFromLatLonInKm(mylat, mylon, LocLat, LocLot);
          const meter = dis * 1000;
          console.log(LocLat, LocLot, meter);
          // console.log(
          //   '마커와 내 위치사이의 거리는 : ',
          //   meter,
          //   '미터',
          //   mylat,
          //   mylon,
          // );
          if (meter <= 1000) {
            // 만약 내 위치와 좌표사이의 거리가 50미터 이내라면
            // 모달창을 띄워주고
            const LocMarker = new Kakao.maps.Marker({
              position,
              image: ClosedMarkerImg,
              clickable: true,
            });
            LocMarker.setMap(mymap);
            markers.push(LocMarker);
            console.log('50이내');
            Kakao.maps.event.addListener(LocMarker, 'click', e =>
              ARmodal({ LocLat, LocLot }),
            );
          } else {
            const LocMarker = new Kakao.maps.Marker({
              position,
              image: LocationMarkerImg,
              clickable: true,
            });
            LocMarker.setMap(mymap);
            markers.push(LocMarker);
            console.log('50미터 밖');
            // 50미터 밖이라면?
            Kakao.maps.event.addListener(LocMarker, 'click', e => noDistance());
          }
        }
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
  }, [mylat, mylon, mymap, location]);

  return (
    <MapWrapper>
      <div className="center" onClick={() => panTo()}>
        중심
      </div>
      <div
        className="question"
        onClick={() => {
          // openGuide(();
          mylocationTest();
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
