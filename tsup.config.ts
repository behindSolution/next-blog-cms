import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'admin/index': 'src/admin/index.tsx',
    'api/index': 'src/api/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'components/index': 'src/components/index.ts',
    'types/index': 'src/types/index.ts',
    'config/index': 'src/config/index.ts'
  },
  clean: true,
  dts: true,
  sourcemap: true,
  minify: false,
  treeshake: true,
  splitting: false,
  format: ['cjs', 'esm'],
  injectStyle: true,
  target: 'es2021',
  define: {
    'process.env.NEXT_BLOG_CMS_VERSION': JSON.stringify(pkg.version)
  },
  external: [
    'react',
    'react-dom',
    'next',
    'next/server',
    'next/headers',
    'next/navigation',
    'swr',
    'better-sqlite3',
    'bcrypt',
    'jsonwebtoken'
  ]
});

