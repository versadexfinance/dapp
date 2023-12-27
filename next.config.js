/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/swap',
      permanent: true,
    },
  ],

  headers: async () => {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: '*' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },

  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    PROJECT_NAME: process.env.PROJECT_NAME,
    PROJECT_DESCRIPTION: process.env.PROJECT_DESCRIPTION,
  },
}

module.exports = nextConfig
