module.exports = {
    pwa: {
      workboxPluginMode: 'GenerateSW',
      iconPaths: {
        favicon32: 'favicon-32x32.png',
        favicon16: 'favicon-16x16.png',
        appleTouchIcon: 'mstile-150x150.png',
        maskIcon: 'mstile-70x70.png',
        msTileImage: 'mstile-144x144.png'
      },

      manifestOptions: {
        name: "Party - Romain house",
        short_name: "House party",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
        theme_color: "#0c1624",
        background_color: "#0c1624",
        display: "standalone",
        Scope: "/",
        orientation: "portrait",
        start_url: "/"
        }
      // configure the workbox plugin
      
      
      
    }
  }