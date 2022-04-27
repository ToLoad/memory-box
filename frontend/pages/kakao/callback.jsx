import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { postLogin } from '../../api/user';
import { useMutation } from 'react-query';

export default function CallbackKakao() {
  // 카카오에서 준 인증코드
  const router = useRouter();
  const { code } = router.query;

  console.log(code);
  const login = useMutation(
    'login',
    async () => {
      console.log(code, '코드가 들어와쪄염');
      return postLogin(code);
    },
    {
      onSuccess: res => {
        console.log(res, '성공');
      },
      onError: err => {
        console.log(err, '실패');
      },
    },
  );

  const main = async () => {
    if (code === null || code === '') {
      alert('카카오에서 코드를 받는데 실패했습니다');
    } else {
      if (code !== undefined) {
        await new Promise(() => {
          login.mutate();
        });
      }
      // await loadUserInfo(accessToken);
    }
  };

  useEffect(() => {
    console.log(code);
    main();
  }, [code]);

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return <>카카오 로그인 중</>;
}

// 여기서 로그인 요청을 보내야 한다.
// const getKakaoTokenHandler = async (resolve, code) => {
//   const url = '/api/user/login';
//   await axios
//     .get(url, { params: { code } })
//     .then(res => {
//       console.log('성공');
//       resolve(res.data);
//     })
//     .catch(error => {
//       resolve(null);
//     });
// };
