import { type AppProps } from 'next/app';
import { SupabaseProvider } from '../context/SupabaseContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SupabaseProvider>
      <Component {...pageProps} />
    </SupabaseProvider>
  );
}
