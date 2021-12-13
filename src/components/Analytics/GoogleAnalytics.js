const GoogleAnalytics = () => {
  const TRACKING_ID = "G-2EVRRPFDQ0";
  const url = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;

  const appendGoogleAnalytics = () => {
    if (typeof window == "undefined") {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", TRACKING_ID);
  };

  return (
    <div>
      <script async src={url}></script>
      <script>{appendGoogleAnalytics()}</script>
    </div>
  );
};
export default GoogleAnalytics;
