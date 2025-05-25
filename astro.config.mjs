import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import staticAdapter from '@astrojs/adapter-static';

export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  base: "/enalia/",
  adapter: staticAdapter()
});
