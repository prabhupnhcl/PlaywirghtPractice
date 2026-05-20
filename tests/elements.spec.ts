import { test, expect } from './fixtures';

test.describe('Elements Page', () => {
    test('should navigate to Text Box and submit form', async ({ elementsPage }) => {
        await elementsPage.navigateToTextBox();
        // Add assertions to verify the form submission results
        await expect(elementsPage.page.locator('#output')).toBeVisible();
        await expect(elementsPage.page.locator('#output #name')).toContainText('Prabhu');
        await expect(elementsPage.page.locator('#output #email')).toContainText('prabhu@gmail.com');
        await expect(elementsPage.page.locator('#output #currentAddress')).toContainText('Current Address');
        await expect(elementsPage.page.locator('#output #permanentAddress')).toContainText('Permanent Address');
    });

    test('should navigate to Check Box and select options', async ({ elementsPage }) => {
        await elementsPage.navigateToCheckBox();    
        // Add assertions to verify the checkbox selection results
        await expect(elementsPage.page.locator('.display-result')).toBeVisible();
        await expect(elementsPage.page.locator('.display-result')).toContainText('home');
    }); 

    test('should navigate to Radio Button and select an option', async ({ elementsPage }) => {
        await elementsPage.navigateToRadioButton();
        // Add assertions to verify the radio button selection results
        await expect(elementsPage.page.locator('.text-success')).toBeVisible();
        await expect(elementsPage.page.locator('.text-success')).toHaveText('Yes');
    });
});
