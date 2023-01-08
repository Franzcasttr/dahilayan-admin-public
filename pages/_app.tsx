import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const showLayout = router.pathname === '/auth/signin' ? false : true;
  // router.pathname === '/auth/signin' || '/login' ? false : true;
  return (
    <Provider store={store}>
      {showLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

export default MyApp;
