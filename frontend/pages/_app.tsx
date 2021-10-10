import '../styles/globals.css';
import { AppProvider } from '../contexts/appContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
export default MyApp;
