import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Background } from '../styles/variables';
import Navbar from '../components/Navbar/Navbar';
import { useEffect, useRef, useState } from 'react';

const client = new QueryClient();

function MyApp({ Component, pageProps }) {
  const background = useRef();
  const [todayhours, setTodayhours] = useState();
  const [backgroundImg, setBackgroundImg] = useState();

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

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={false} />
        <Background
          ref={background}
          className={backgroundImg === 'Day' ? 'day' : 'night'}
        />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
