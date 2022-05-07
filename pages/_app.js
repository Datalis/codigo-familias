import Script from 'next/script'
import '../styles/main.scss'

const GID = 'G-0X2VKGWSPN';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${GID}`}/>
      <Script id='gtag-init'
        strategy='afterInteractive' 
        dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${GID}');
      `
      }} />
    </>
  )
}

export default MyApp
