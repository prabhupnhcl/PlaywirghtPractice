import { type Page, type Locator} from "@playwright/test";
import { Actions } from "../utils/actions";

export class ElementsPage {
    readonly page: Page;
    readonly actions: Actions;
    readonly textBox: Locator;
    readonly checkBox: Locator
    readonly radioButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.actions = new Actions(page);
        const sidebar = page.locator('.left-pannel');
        this.textBox = sidebar.getByText('Text Box');
        this.checkBox = sidebar.getByText('Check Box');
        this.radioButton = sidebar.getByText('Radio Button');
    }

    async goto() {
        await this.actions.goto("https://demoqa.com/elements");
    }

    async navigateToTextBox() {
        await this.actions.click(this.textBox, "Text Box sidebar");
        await this.actions.fill(this.page.locator('#userName'), "Prabhu", "Username");
        await this.actions.fill(this.page.locator('#userEmail'), "prabhu@gmail.com", "Email");
        await this.actions.fill(this.page.locator('#currentAddress'), "Current Address", "Current Address");
        await this.actions.fill(this.page.locator('#permanentAddress'), "Permanent Address", "Permanent Address");
        await this.actions.forceClick(this.page.locator('#submit'), "Submit button");
    }

    async navigateToCheckBox() {
        await this.actions.click(this.checkBox, "Check Box sidebar");
        await this.actions.click(this.page.getByRole('checkbox', { name: 'Select Home' }), "Select Home checkbox");
    }

    async navigateToRadioButton() {
        await this.actions.click(this.radioButton, "Radio Button sidebar");
        await this.actions.click(this.page.locator('label[for="yesRadio"]'), "Yes radio button");
    }

}
