import "../styles/globals.css";
import { TipProvider, AuthProvider } from "providers";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TipProvider>
        <AuthProvider>
          <Head>
            <link rel="icon" href="/favicon_dark.ico" />
            <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: dark)" />
          </Head>
          <Component {...pageProps} />
        </AuthProvider>
      </TipProvider>
      <Analytics />
    </>
  );
}

export default App;
