/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "imgpanda.com",
      "i.ibb.co",
      "upload.wikimedia.org",
      "gulfvisiongov.com",
      "www.tsilimited.com",
    ],
  },
  compiler: { styledComponents: true },
  serverRuntimeConfig: {
    // Only available on server side
    odooSecret: process.env.ODOO_PASSWORD,
  },
  publicRuntimeConfig: {
    // Available on both server and client
    appEnv: process.env.NODE_ENV,
  },
};

export default nextConfig;
