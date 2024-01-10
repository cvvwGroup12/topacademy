import React, { Component } from "react";
import * as PropTypes from "prop-types";
import Head from "next/head";
import Script from "next/script";
import { hotjar } from 'react-hotjar';

function getTagElement([key, value]) {
  // ... (existing code for getTagElement function)
}

export default class HeadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.setState({
      loaded: document.readyState === "complete"
    });

    document.addEventListener("readystatechange", () => {
      this.setState({
        loaded: document.readyState === "complete"
      });
    });

    hotjar.initialize(3228407, 6); // Hotjar initialization goes here
  }

  render() {
    const gasource = "https://www.googletagmanager.com/gtag/js?id=" + process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
    return (
      <Head>
        {/* ... (existing head elements) */}
        <Script id="tawktoscriptwrapper" dangerouslySetInnerHTML={{
          __html: `var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/618820a76885f60a50bab91d/1fjtrv3j1';
              s1.charset='UTF-8';
              s1.setAttribute('crossOrigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();`,
        }}>
        </Script>
        <Script id="gascriptloader" src={gasource}></Script>
        <Script id="gascriptwrapper">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        
        {/* Hotjar tracking script */}
        <Script id="hotjar-script" dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3820239,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `
        }} />
      </Head>
    );
  }
}

HeadComponent.propTypes = {
  socialTags: PropTypes.object
};
