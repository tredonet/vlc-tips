import "../styles/globals.css";
import { TipProvider, AuthProvider } from "providers";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TipProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </TipProvider>
      <Analytics />
    </>
  );
}

export default App;
