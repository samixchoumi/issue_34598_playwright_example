import { expect } from 'allure-playwright';
import { createBdd } from 'playwright-bdd';

const { Given, Then } = createBdd();

Given('I am logged in', async function ({ page }) {
  await page.goto('/');
});

Then('I should not see google image', async function ({ page }) {
  await expect(page.locator('img[alt="Google"]')).not.toBeVisible();
});

Then('I should not see {} input', async function ({ page }, inputValue: string) {
  await expect(page.locator(`input[value="${ inputValue }"]`)).not.toBeVisible();
});

Then('I should see google image', async function ({ page }) {
  await expect(page.locator('img[alt="Google"]')).toBeVisible();
});

Then('I should see {} input', async function ({ page }, inputValue: string) {
  await expect(page.locator(`input[value="${ inputValue }"]`)).toBeVisible();
});