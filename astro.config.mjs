import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://enalia-therapy.gr',
  trailingSlash: 'never',
  integrations: [tailwind(), sitemap(), react()],
<<<<<<< HEAD
  // base: REMOVE it for root deploy
=======
>>>>>>> 2a59440a0d4f7579388cba8821abb76724d9274c
});
