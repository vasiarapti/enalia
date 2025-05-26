import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
// import staticAdapter from '@astrojs/adapter-static';
import github from '@astrojs/github';

export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  site: 'https://astronaut.github.io',
  base: '/enalia/',
  adapter: staticAdapter()
});
