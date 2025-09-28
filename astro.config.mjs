import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [tailwind(), sitemap(), react()],
  trailingSlash: 'never',
  site: 'https://enalia-therapy.gr',
  base: '/enalia/',
});
