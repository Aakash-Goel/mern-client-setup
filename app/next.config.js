const router = require('./routes');

const initExport = {
  // webpack: (config, { dev, isServer }) => {
  webpack: (config, { dev }) => {
    // const prod = !dev;

    if (dev) {
      config.module.rules.push({
        test: /\.(jsx?|gql|graphql)$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/', '/app/.next/'],
        enforce: 'pre',
      });
    }

    return config;
  },
};

if (process.env.STATIC_EXPORT) {
  initExport.exportPathMap = function exportPathMap() {
    const routes = {};
    routes['/'] = {
      page: '/',
    };
    router.routes.forEach(route => {
      if (!route.pattern.includes(':')) {
        routes[route.pattern] = {
          page: route.page,
        };
      }
    });

    return routes;
  };
}

module.exports = initExport;
