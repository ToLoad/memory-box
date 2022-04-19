import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
        <GlobalStyle />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
