import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Background } from '../styles/variables';
import Navbar from '../components/Navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import { refreshToken } from '../api/user';
import { RefapiClient, loginApiInstance } from '../api';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import * as gtag from '../lib/gtag';
import { RecoilRoot } from 'recoil';
const JWTapiClient = loginApiInstance();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function MyApp({ Component, pageProps }) {
  const background = useRef();
  const [todayhours, setTodayhours] = useState();
  const [backgroundImg, setBackgroundImg] = useState();
  const [indexPage, setIndexPage] = useState(false);
  const [arPage, setArPage] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const today = new Date();
    const hours = `0${today.getHours()}`.slice(-2);
    setTodayhours(Number(hours));
  });

  useEffect(() => {
    if (todayhours >= 18 || todayhours < 7) {
      setBackgroundImg('Night');
    } else {
      setBackgroundImg('Day');
    }
  }, [todayhours]);

  useEffect(() => {
    let url = window.document.location.href;
    if (
      url === 'http://localhost:3000/' ||
      url === 'https://k6e201.p.ssafy.io/' ||
      url === 'https://memory-box.kr/'
    ) {
      setIndexPage(true);
    } else {
      setIndexPage(false);
    }
  });

  useEffect(() => {
    let url = window.document.location.href;
    if (
      url === 'http://localhost:3000/ar' ||
      url === 'https://k6e201.p.ssafy.io/ar' ||
      url === 'https://memory-box.kr/ar'
    ) {
      setArPage(true);
    } else {
      setArPage(false);
    }
  });

  const Refresh = async () => {
    const result = await JWTapiClient.post(`user/refresh`).catch(err => {
      if (err.response.status === 401) {
        Router.push('/login');
      }
    });
    return result;
  };

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ReactQueryDevtools initialIsOpen={false} />
          <Background
            ref={background}
            className={backgroundImg === 'Day' ? 'day' : 'night'}
          />

          <Head>
            <title>기억:함(函)</title>
          </Head>
          {!indexPage && <Navbar />}
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
