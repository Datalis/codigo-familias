/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compress: true,

    experimental: {
        images: {
            layoutRaw: true,
        },
    },

    images: {
        domains: ["api.eltoque.com"],
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

module.exports = nextConfig;
