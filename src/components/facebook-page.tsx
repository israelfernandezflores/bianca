import React, { useEffect } from 'react';

const FacebookPage: React.FC = () => {
  useEffect(() => {
    // Cargar el SDK de Facebook
    if (!(window as unknown as {FB: unknown}).FB) {
      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0';
        fjs.parentNode?.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }, []);

  return (
    <div>
      <div id="fb-root"></div>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/facebook"
        data-tabs="timeline"
        data-width="500"
        data-height="70"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/facebook"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/facebook">Facebook Page</a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookPage;