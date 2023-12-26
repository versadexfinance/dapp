/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/swap',
      permanent: true,
    },
  ],
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_DESCRIPTION: process.env.PROJECT_DESCRIPTION,
  },
}

module.exports = nextConfig
