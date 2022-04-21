import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Background } from '../styles/variables';
import Navbar from '../components/Navbar/Navbar';

const client = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={false} />
        <Background>
          <Navbar />
          <Component {...pageProps} />
        </Background>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
