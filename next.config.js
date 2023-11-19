const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qkkuacqtcsfjbnzmxmhk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
};

module.exports = nextConfig;
