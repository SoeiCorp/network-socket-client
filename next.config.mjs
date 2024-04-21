/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["img.freepik.com"],
  },
  async headers() {
    return [
      {
        source: "/api/auth/me",
        headers: [
          {
            key: "Authorization",
            value: "Bearer *",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
