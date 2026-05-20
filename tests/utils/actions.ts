import { test } from '@playwright/test';
import { type Page, type Locator, type Dialog } from '@playwright/test';

export class Actions {
    constructor(private readonly page: Page) {}

    async click(locator: Locator, description: string) {
        await test.step(`Click: ${description}`, async () => {
            await locator.click();
        });
    }

    async forceClick(locator: Locator, description: string) {
        await test.step(`Force click: ${description}`, async () => {
            await locator.scrollIntoViewIfNeeded();
            await locator.click({ force: true });
        });
    }

    async fill(locator: Locator, value: string, description: string) {
        await test.step(`Fill: ${description} with "${value}"`, async () => {
            await locator.fill(value);
        });
    }

    async selectOption(locator: Locator, value: string, description: string) {
        await test.step(`Select: ${description} → "${value}"`, async () => {
            await locator.selectOption(value);
        });
    }

    async goto(url: string) {
        await test.step(`Navigate to: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async handleAlert(trigger: Locator, description: string) {
        await test.step(`Handle alert: ${description}`, async () => {
            this.page.once('dialog', async (dialog: Dialog) => {
                await dialog.accept();
            });
            await trigger.click();
        });
    }

    async handleConfirmAccept(trigger: Locator, description: string) {
        await test.step(`Accept confirm: ${description}`, async () => {
            this.page.once('dialog', async (dialog: Dialog) => {
                await dialog.accept();
            });
            await trigger.click();
        });
    }

    async handleConfirmDismiss(trigger: Locator, description: string) {
        await test.step(`Dismiss confirm: ${description}`, async () => {
            this.page.once('dialog', async (dialog: Dialog) => {
                await dialog.dismiss();
            });
            await trigger.click();
        });
    }

    async handlePrompt(trigger: Locator, text: string, description: string) {
        await test.step(`Handle prompt: ${description} with "${text}"`, async () => {
            this.page.once('dialog', async (dialog: Dialog) => {
                await dialog.accept(text);
            });
            await trigger.click();
        });
    }

    async pressKey(key: string, description: string) {
        await test.step(`Press key: ${description}`, async () => {
            await this.page.keyboard.press(key);
        });
    }

    async clickByLocator(selector: string, description: string) {
        await test.step(`Click: ${description}`, async () => {
            await this.page.locator(selector).click();
        });
    }
}
