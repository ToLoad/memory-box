import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CallbackKakao() {
  const router = useRouter();
  // 카카오에서 준 인증코드
  const { code } = router.query;

  const getKakaoTokenHandler = async (resolve, code) => {
    const url = '/api/user/login';
    await axios
      .get(url, { params: { code } })
      .then(res => {
        console.log('res: ', res);
        resolve(res.data);
      })
      .catch(error => {
        console.log(error.response);
        resolve(null);
      });
  };

  const main = async () => {
    if (code === null || code === '') {
      alert('카카오에서 코드를 받는데 실패했습니다');
    } else {
      await new Promise(resolve => {
        console.log(code, '코드');
        getKakaoTokenHandler(resolve, code.toString());
      });
      // await loadUserInfo(accessToken)
    }
  };

  useEffect(() => {
    console.log(code);
    main();
  }, []);

  return <>카카오 로그인 중</>;
}
