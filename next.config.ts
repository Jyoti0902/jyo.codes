import type { NextConfig } from "next";

// The site is fully static, so `next build` exports plain HTML/CSS/JS to `out/`
// and GitHub Pages serves it. Pages hosts project sites under a sub-path
// (https://<user>.github.io/<repo>/), so the base path is injected at build time
// by the deploy workflow.
//
// Moving to a custom domain later is a matter of changing two values in
// `.github/workflows/deploy.yml`:
//   NEXT_PUBLIC_BASE_PATH: ""                    (root domain, no sub-path)
//   NEXT_PUBLIC_SITE_URL: https://jyo.codes      (absolute URL used in metadata)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  // GitHub Pages has no image optimisation server, so images ship as-is.
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
