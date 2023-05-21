/** @type {import('next').NextConfig} */

const nodeExternals = require("webpack-node-externals");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [nodeExternals()];
    }
    // config.module.rules.push({
    //   test: /\.tsx?$/,
    //   use: [options.defaultLoaders.babel],
    // });
    return config;
  },
};
