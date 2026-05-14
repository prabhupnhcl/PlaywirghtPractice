import { test, expect } from '@playwright/test';

test('Fill and submit Practice Form and assert success modal', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');

  // Fill Name
  await page.locator('#firstName').fill('John');
  await page.locator('#lastName').fill('Doe');

  // Fill Email
  await page.locator('#userEmail').fill('johndoe@example.com');

  // Select Gender
  await page.locator('label[for="gender-radio-1"]').click();

  // Fill Mobile
  await page.locator('#userNumber').fill('1234567890');

  // Fill Date of Birth
  await page.locator('#dateOfBirthInput').click();
  await page.locator('.react-datepicker__month-select').selectOption('5'); // June (0-indexed)
  await page.locator('.react-datepicker__year-select').selectOption('1995');
  await page.locator('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click();

  // Fill Subjects
  await page.locator('#subjectsInput').fill('Maths');
  await page.locator('.subjects-auto-complete__option').first().click();

  // Select Hobbies
  await page.locator('label[for="hobbies-checkbox-1"]').click(); // Sports
  await page.locator('label[for="hobbies-checkbox-2"]').click(); // Reading

  // Fill Current Address
  await page.locator('#currentAddress').fill('123 Test Street, Automation City');

  // Select State
  await page.locator('#state').click();
  await page.locator('#react-select-3-option-1').click(); // Uttar Pradesh

  // Select City
  await page.locator('#city').click();
  await page.locator('#react-select-4-option-1').click(); // Merrut

  // Submit the form - scroll to submit button first to avoid ad overlays
  await page.locator('#submit').scrollIntoViewIfNeeded();
  await page.locator('#submit').click({ force: true });

  // Assert success modal is visible
  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();

  // Assert modal title
  await expect(modal.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');

  // Assert submitted values in the modal table
  const tableRows = modal.locator('tbody tr');

  await expect(tableRows.nth(0).locator('td').last()).toHaveText('John Doe');
  await expect(tableRows.nth(1).locator('td').last()).toHaveText('johndoe@example.com');
  await expect(tableRows.nth(2).locator('td').last()).toHaveText('Male');
  await expect(tableRows.nth(3).locator('td').last()).toHaveText('1234567890');
  await expect(tableRows.nth(4).locator('td').last()).toHaveText('15 June,1995');
  await expect(tableRows.nth(5).locator('td').last()).toHaveText('Maths');
  await expect(tableRows.nth(6).locator('td').last()).toHaveText('Sports, Reading');
  // Row 7 is Picture (empty since no file uploaded)
  await expect(tableRows.nth(8).locator('td').last()).toHaveText('123 Test Street, Automation City');
  await expect(tableRows.nth(9).locator('td').last()).toHaveText('Uttar Pradesh Lucknow');

  // Close modal
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible({ timeout: 5000 });
});
