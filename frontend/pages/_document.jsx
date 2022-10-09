import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_KEY;
    return (
      <Html>
        <Head>
          <script src="https://aframe.io/releases/1.3.0/aframe.min.js" />
          <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js" />
          <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js" />
          <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <link rel="icon" href="/하미.ico" />
          <meta property="og:title" content="기억:함(函)" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://memory-box.kr/" />
          <meta property="og:image" content="/assets/images/openBox.png" />
          <meta
            property="og:description"
            content="우리들의 추억을 보관하세요!"
          />
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services&autoload=false`}
          />
        </Head>
        <body id="box">
          <img src="/favicon-16x16.png" alt="" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
