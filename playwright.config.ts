import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import * as fs from 'fs';
import { defineBddConfig } from 'playwright-bdd';

dotenv.config();

// Dynamically load the JSON file based on the environment variable or default to a specific one
const configPath = `./config/test.json`;
// Load the configuration file
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const testDir = defineBddConfig({
  features: 'tests/*/*.feature',
  steps: 'tests/*/*/*.ts'
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : 5,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['./node_modules/playwright-slack-report/dist/src/SlackReporter.js', { sendResults: 'off' }],
    ['blob'], ['list'], ['allure-playwright', { outputFolder: `allure-results` }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: config.baseUrl,
    trace: 'off',
    navigationTimeout: 60000,
    actionTimeout: 43000,
    screenshot: 'only-on-failure'
  },
  expect: { timeout: 43000 },
  timeout: 480000,
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome_test',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        timezoneId: 'Europe/Paris',
        launchOptions: { args: ['--disable-gpu'] },
        contextOptions: { screen: { width: 1920, height: 1024 } },
        deviceScaleFactor: 1,
        viewport: { width: 1920, height: 1024 },
      }
    }
  ]
});
