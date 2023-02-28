import "../styles/globals.css";
import { TipProvider, AuthProvider } from "providers";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <TipProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </TipProvider>
  );
}

export default App;
