/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Não falha o build por causa de erros de ESLint
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "34.39.211.212",
        port: "3018",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
