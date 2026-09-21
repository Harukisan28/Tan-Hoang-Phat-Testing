import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const environment = (globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
}).process?.env ?? {};
const repositoryName = environment.GITHUB_REPOSITORY?.split('/').pop();
const defaultBase = repositoryName && !repositoryName.endsWith('.github.io') ? `/${repositoryName}/` : '/';

export default defineConfig({
  base: environment.VITE_BASE_PATH ?? defaultBase,
  plugins: [react(), svgr()],
});
