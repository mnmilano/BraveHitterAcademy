/** @type {import('next').NextConfig} */
const nextConfig = { images: { unoptimized: true }, experimental: { serverActions: { bodySizeLimit: '1mb' } } };
export default nextConfig;
