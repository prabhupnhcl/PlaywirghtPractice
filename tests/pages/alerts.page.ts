import { type Page, type Locator } from "@playwright/test";
import { Actions } from "../utils/actions";

export class AlertsPage {
    readonly page: Page;
    readonly actions: Actions;
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promtButton: Locator;
    readonly timerAlertButton: Locator;
    readonly confirmResult: Locator;
    readonly promptResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.actions = new Actions(page);
        this.alertButton = page.locator('#alertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.promtButton = page.locator('#promtButton');
        this.timerAlertButton = page.locator('#timerAlertButton');
        this.confirmResult = page.locator('#confirmResult');
        this.promptResult = page.locator('#promptResult');
    }

    async goto() {
        await this.actions.goto("https://demoqa.com/alerts");
    }

    async handleAlert() {
        await this.actions.handleAlert(this.alertButton, "Simple alert");
    }

    async handleConfirmAccept() {
        await this.actions.handleConfirmAccept(this.confirmButton, "Confirm accept");
    }

    async handleConfirmDismiss() {
        await this.actions.handleConfirmDismiss(this.confirmButton, "Confirm dismiss");
    }

    async handlePrompt(text: string) {
        await this.actions.handlePrompt(this.promtButton, text, "Prompt dialog");
    }

    async handleDelayedAlert() {
        await this.actions.handleAlert(this.timerAlertButton, "Delayed alert");
    }
}
