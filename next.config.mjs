/** @type {import('next').NextConfig} */
const nextConfig = {
    disableStaticImages: true,
    images: {
        disableStaticImages: true,
        remotePatterns: [{
                protocol: "http",
                hostname: "k.kakaocdn.net",
            },
            {
                protocol: "https",
                hostname: "rgvzlonuavmjvodmalpd.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/u/**",
            },
            {
                protocol: "https",
                hostname: "aceternity.com",
            },
        ],
    },
};

export default nextConfig;