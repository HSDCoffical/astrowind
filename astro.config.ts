import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';
import { globby } from 'globby';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

// ===== 自定义集成：生成搜索索引（暂时禁用） =====
// function searchIndex(): AstroIntegration {
//   return {
//     name: 'search-index',
//     hooks: {
//       'astro:build:done': async ({ dir }) => {
//         const distDir = new URL('.', dir);
//         const files = await globby('**/*.html', {
//           cwd: new URL('.', dir).pathname,
//           absolute: true,
//         });
// 
//         const pages = [];
// 
//         for (const file of files) {
//           const content = await fs.readFile(file, 'utf-8');
//           const titleMatch = content.match(/<title[^>]*>([^<]*)<\/title>/);
//           const title = titleMatch ? titleMatch[1] : '无标题';
//           const bodyMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
//           const bodyText = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
//           const descMatch = content.match(/<meta name="description"[^>]*content="([^"]*)"[^>]*>/);
//           const description = descMatch ? descMatch[1] : bodyText.slice(0, 150);
//           const relPath = path.relative(new URL('.', dir).pathname, file);
//           const url = '/' + relPath.replace(/index\.html$/, '').replace(/\.html$/, '');
// 
//           pages.push({
//             title,
//             url: url || '/',
//             description: description || bodyText.slice(0, 150),
//             content: bodyText.slice(0, 500),
//           });
//         }
// 
//         const outputPath = new URL('search.json', dir);
//         await fs.writeFile(outputPath, JSON.stringify(pages, null, 2), 'utf-8');
//         console.log(`✅ 搜索索引已生成: ${pages.length} 个页面`);
//       },
//     },
//   };
// }

export default defineConfig({
  output: 'static',

  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),

    // searchIndex(), // 已禁用
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      rehypePlugins: [responsiveTablesRehypePlugin],
    }),
  },

  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'mock-dashboard-layout',
        resolveId(id) {
          if (id.includes('DashboardLayout.astro')) {
            return '\0mock-dashboard';
          }
        },
        load(id) {
          if (id === '\0mock-dashboard') {
            return 'export default {};';
          }
        },
      },
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
});