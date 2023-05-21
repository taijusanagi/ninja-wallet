/** @type {import('next').NextConfig} */

const nodeExternals = require("webpack-node-externals");

module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [nodeExternals()];
    }
  },
};
