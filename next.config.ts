import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "assets.coingecko.com",
			},
		],
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200],
		imageSizes: [16, 32, 48, 64, 96],
	},
	experimental: {
		viewTransition: true,
		useLightningcss: true,
		lightningCssFeatures: {
			include: ["light-dark", "oklab-colors"],
		},
		optimizePackageImports: ["@heroui/react", "@heroui/styles", "lucide-react"],
		sri: {
			algorithm: "sha256",
		},
	},
	poweredByHeader: false,
	compress: true,
	reactStrictMode: true,
	turbopack: {
		ignoreIssue: [
			{
				path: "**/node_modules/@heroui/**",
				title: "PressResponder warning",
				description: "Known HeroUI accessibility warning",
			},
		],
	},
};

export default nextConfig;
