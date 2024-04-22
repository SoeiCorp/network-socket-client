/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: { NEXT_PUBLIC_NEXT_PUBLIC_SOCKET_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL },
    images: {
        domains: ['img.freepik.com']
    },
    async headers() {
        return [
            {
                source: '/api/auth/me',
                headers: [
                    {
                        key: 'Authorization',
                        value: 'Bearer *'
                    }
                ]
            }
        ];
    }
};

export default nextConfig;
