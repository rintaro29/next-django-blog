/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //特定の外部ソースからの画像を許可
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    //サーバーアクションのボディサイズ制限を2MBに設定
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
