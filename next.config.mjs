/** @type {import('next').NextConfig} */
const nextConfig = {
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
