// // 카메라에 맞는 내 위치 추가
// window.onload = () => {
//   return navigator.geolocation.watchPosition(function (position) {
//     const camera = document.querySelector('a-camera');
//     camera.setAttribute('fake-loc', true);
//     camera.setAttribute(
//       'gps-camera',
//       `simulateLatitude: ${position.coords.latitude}; simulateLongitude: ${position.coords.longitude};`,
//     );
//     console.log(
//       '현재 위치',
//       position.coords.latitude,
//       position.coords.longitude,
//     );
//   });
// };
