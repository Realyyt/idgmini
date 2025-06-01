import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'bqcdunonvystdiixihsn.supabase.co', 'idginsuranceagency.impactdeliverygroup.com'],
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig;
