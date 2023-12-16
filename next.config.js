/** @type {import('next').NextConfig} */
const nextConfig = {redirects : async () => [
    {
        source: '/',
        destination: '/swap',
        permanent: true,
      }
]}

module.exports = nextConfig
