/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/app/api/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;