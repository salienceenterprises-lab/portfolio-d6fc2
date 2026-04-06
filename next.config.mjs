
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/portfolio-d6fc2', // This ensures CSS/JS paths include the repo name
};
export default nextConfig;
