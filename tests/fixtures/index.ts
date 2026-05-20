import { test as base, expect } from '@playwright/test';
import { AlertsPage } from '../pages/alerts.page';
import { ElementsPage } from '../pages/elements.page';
import { PracticeFormPage } from '../pages/practice-form.page';
import { Actions } from '../utils/actions';

type Fixtures = {
  actions: Actions;
  alertsPage: AlertsPage;
  elementsPage: ElementsPage;
  practiceFormPage: PracticeFormPage;
};

export const test = base.extend<Fixtures>({
  actions: async ({ page }, use) => {
    await use(new Actions(page));
  },
  alertsPage: async ({ page }, use) => {
    const alertsPage = new AlertsPage(page);
    await alertsPage.goto();
    await use(alertsPage);
  },
  elementsPage: async ({ page }, use) => {
    const elementsPage = new ElementsPage(page);
    await elementsPage.goto();
    await use(elementsPage);
  },
  practiceFormPage: async ({ page }, use) => {
    const practiceFormPage = new PracticeFormPage(page);
    await practiceFormPage.goto();
    await use(practiceFormPage);
  },
});

export { expect };
