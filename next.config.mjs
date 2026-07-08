/** @type {import('next').NextConfig} */
const nextConfig = {
  // The design uses plain <img> tags and a couple of a11y-lint patterns from the
  // original static build; don't let lint block production builds.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
