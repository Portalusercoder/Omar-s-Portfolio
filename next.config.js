const repository = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repository.split("/")[1] ?? "";
const basePath =
  process.env.GITHUB_ACTIONS === "true" && repoName && !repoName.endsWith(".github.io")
    ? `/${repoName}`
    : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
