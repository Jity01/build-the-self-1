import '../styles/global.css'
// import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: any) { // TODO: type props
  return <Component {...pageProps} />
}
