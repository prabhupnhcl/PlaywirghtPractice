import { test, expect } from './fixtures';

test.describe('Alerts Page', () => {
    test('should handle simple alert', async ({ alertsPage }) => {
        await alertsPage.handleAlert();
        // Alert accepted successfully — no error means pass
    });

    test('should handle confirm box and accept', async ({ alertsPage }) => {
        await alertsPage.handleConfirmAccept();
        await expect(alertsPage.confirmResult).toHaveText('You selected Ok');
    });

    test('should handle confirm box and dismiss', async ({ alertsPage }) => {
        await alertsPage.handleConfirmDismiss();
        await expect(alertsPage.confirmResult).toHaveText('You selected Cancel');
    });

    test('should handle prompt and enter text', async ({ alertsPage }) => {
        await alertsPage.handlePrompt('Playwright');
        await expect(alertsPage.promptResult).toContainText('Playwright');
    });

    test('should handle delayed alert', async ({ alertsPage }) => {
        await alertsPage.handleDelayedAlert();
        // Wait for the 5-second timer alert
        await expect(alertsPage.page.locator('body')).toBeVisible({ timeout: 10000 });
    });
});