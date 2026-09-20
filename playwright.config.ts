import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  outputDir: './pw-results',
  use: {
    channel: 'chrome',
    headless: false,
    trace: 'on-first-retry',
  }
});
