import React, { useEffect } from 'react';
import KakaoShare from '../components/KakaoShare';
import moment from 'moment';

export default function tests() {
  useEffect(() => {
    const $script = document.createElement('script');
    $script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    $script.async = true;

    document.head.appendChild($script);

    return () => {
      document.head.removeChild($script);
    };
  }, []);

  const today = moment();
  console.log(today, '오늘날짜');
  // eslint-disable-next-line react/button-has-type
  return (
    <div style={{ marginTop: '100px' }}>
      <KakaoShare />
    </div>
  );
}
