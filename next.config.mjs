/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: { NEXT_PUBLIC_NEXT_PUBLIC_SOCKET_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL },
    images: {
        domains: ['img.freepik.com']
    },
    webpack: (config, { webpack }) => {
        config.plugins.push(
            new webpack.IgnorePlugin({
                resourceRegExp: /^pg-native$|^cloudflare:sockets$/
            })
        );

        return config;
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
            },
            {
                source: '/',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'false' },
                    { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date' }
                ]
            }
            // {
            //     source: '/',
            //     headers: [
            //         { key: 'Access-Control-Allow-Credentials', value: 'false' },
            //         { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL },
            //         { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
            //         { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date' }
            //     ]
            // }
        ];
    }
};

export default nextConfig;
