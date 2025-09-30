import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['fs']
  },
  // Konfigurasi untuk file upload
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
  // Allow external images from Supabase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'zfyjvwctyvefzdcietpk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      }
    ],
  }
};

export default nextConfig;
