import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
// import staticAdapter from '@astrojs/adapter-static';
// import github from '@astrojs/github';
import sitemap from '@astrojs/sitemap';

const LIVE_URL = "https://vasiarapti.github.io/";

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    react()
  ],
  trailingSlash: 'never',
  site: LIVE_URL,
  base: '/enalia/'
  // adapter: staticAdapter()
});
