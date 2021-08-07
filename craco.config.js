const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@screen-xxl': '2900px', '@screen-xl': '2100px', '@screen-lg': '1200px'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};