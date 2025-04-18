/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgpanda.com', 'i.ibb.co', 'upload.wikimedia.org', 'gulfvisiongov.com', 'www.tsilimited.com'],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
