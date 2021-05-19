module.exports = {
    pwa: {
      name: 'Party - Romain house',
      short_name: "House party",
      theme_color: "#0c1624",
      msTileColor: '#0c1624',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      display: "standalone",
      Scope: "/",
      orientation: "portrait",
      start_url: "/",
      // configure the workbox plugin
      workboxPluginMode: 'GenerateSW',
      iconPaths: {
        favicon32: 'favicon-32x32.png',
        favicon16: 'favicon-16x16.png',
        appleTouchIcon: 'mstile-150x150.png',
        maskIcon: 'mstile-70x70.png',
        msTileImage: 'mstile-144x144.png'
      }
    }
  }