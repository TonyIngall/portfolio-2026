// @ts-check
import { defineConfig } from 'astro/config';
import swup from '@swup/astro';

export default defineConfig({
  integrations: [swup({
    theme: false
  })]
});
