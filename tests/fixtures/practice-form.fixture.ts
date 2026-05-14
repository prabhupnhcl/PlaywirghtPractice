import { test as base, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/practice-form.page';

// Declare custom fixture types
type PracticeFormFixtures = {
  practiceFormPage: PracticeFormPage;
};

// Extend the base test with custom fixtures
export const test = base.extend<PracticeFormFixtures>({
  practiceFormPage: async ({ page }, use) => {
    const practiceFormPage = new PracticeFormPage(page);
    await practiceFormPage.goto();
    await use(practiceFormPage);
  },
});

export { expect };
