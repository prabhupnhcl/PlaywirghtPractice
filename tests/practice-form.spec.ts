import { test, expect } from './fixtures';
import { type StudentFormData } from './pages/practice-form.page';

const studentData: StudentFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  gender: 'Male',
  mobile: '1234567890',
  dateOfBirth: { day: '15', month: '5', year: '1995' },
  subjects: ['Maths'],
  hobbies: ['Sports', 'Reading'],
  currentAddress: '123 Test Street, Automation City',
  state: 'Uttar Pradesh',
  city: 'Lucknow',
};

test.describe('Practice Form', () => {
  test('should show success modal with correct data after submission', async ({ practiceFormPage }) => {
    await practiceFormPage.fillAndSubmit(studentData);

    // Assert success modal is visible
    await expect(practiceFormPage.successModal).toBeVisible();
    await expect(practiceFormPage.modalTitle).toHaveText('Thanks for submitting the form');

    // Assert submitted values in the modal table
    const rows = practiceFormPage.modalTableRows;
    await expect(rows.nth(0).locator('td').last()).toHaveText('John Doe');
    await expect(rows.nth(1).locator('td').last()).toHaveText('johndoe@example.com');
    await expect(rows.nth(2).locator('td').last()).toHaveText('Male');
    await expect(rows.nth(3).locator('td').last()).toHaveText('1234567890');
    await expect(rows.nth(4).locator('td').last()).toHaveText('15 June,1995');
    await expect(rows.nth(5).locator('td').last()).toHaveText('Maths');
    await expect(rows.nth(6).locator('td').last()).toHaveText('Sports, Reading');
    // Row 7 is Picture (empty since no file uploaded)
    await expect(rows.nth(8).locator('td').last()).toHaveText('123 Test Street, Automation City');
    await expect(rows.nth(9).locator('td').last()).toHaveText('Uttar Pradesh Lucknow');
  });

  test('should close success modal on Escape', async ({ practiceFormPage }) => {
    await practiceFormPage.fillAndSubmit(studentData);

    await expect(practiceFormPage.successModal).toBeVisible();
    await practiceFormPage.closeModal();
    await expect(practiceFormPage.successModal).not.toBeVisible({ timeout: 5000 });
  });
});
