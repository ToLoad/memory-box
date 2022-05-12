import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { postLogin } from '../../api/user';
import { useMutation } from 'react-query';
import Loading from '../../components/Loading/Loading';

export default function CallbackKakao() {
  // 카카오에서 준 인증코드
  const router = useRouter();
  const { code } = router.query;

  const login = useMutation(
    'login',
    async () => {
      return postLogin(code);
    },
    {
      onSuccess: res => {
        // 조건
        // 직접 접속 --> 홈페이지
        if (sessionStorage.getItem('id')) {
          router.push(`/register/${sessionStorage.getItem('id')}`);
        } else {
          router.push('/main');
        }
        // 링크를 통해 들어온 사람 --> 아이템 넣기 페이지
      },
      onError: err => {},
    },
  );

  useEffect(() => {
    // console.log(code);
    // main();
    if (code !== undefined) {
      login.mutate();
    }
  }, [code]);

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return <Loading />;
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
