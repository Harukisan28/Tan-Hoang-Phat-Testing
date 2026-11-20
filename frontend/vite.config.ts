import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const environment = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env ?? {};
const repositoryName = environment.GITHUB_REPOSITORY?.split('/').pop();
const hasCustomDomain = existsSync(fileURLToPath(new URL('./public/CNAME', import.meta.url)));

// A custom domain is always served from the root, while a project page lives under /<repository>/.
const defaultBase = hasCustomDomain
  ? '/'
  : repositoryName && !repositoryName.endsWith('.github.io')
    ? `/${repositoryName}/`
    : '/';

export default defineConfig({
  base: environment.VITE_BASE_PATH ?? defaultBase,
  plugins: [react(), svgr()],
});
