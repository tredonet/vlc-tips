import '../styles/globals.css';
import { DataProvider } from 'providers/provider';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default App;
