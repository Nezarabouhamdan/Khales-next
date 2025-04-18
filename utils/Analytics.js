// src/components/Analytics.js
import React from "react";

const Analytics = () => {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QWG6JYC3Q8"
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Default consent to 'denied' until the user accepts
          gtag('consent', 'default', {
            analytics_storage: 'denied',
          });

          // Initialize GA4
          gtag('config', 'G-QWG6JYC3Q8');
        `}
      </script>
      <script>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '9524287924291839');
          fbq('track', 'PageView');
        `}
      </script>
    </>
  );
};

export default Analytics;
