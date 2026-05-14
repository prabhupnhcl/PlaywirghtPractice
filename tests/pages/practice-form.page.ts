import { type Page, type Locator } from '@playwright/test';

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  dateOfBirth: { day: string; month: string; year: string };
  subjects: string[];
  hobbies: ('Sports' | 'Reading' | 'Music')[];
  currentAddress: string;
  state: string;
  city: string;
}

export class PracticeFormPage {
  // Form field locators — using stable ID-based selectors
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobile: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly currentAddress: Locator;
  readonly submitButton: Locator;

  // Modal locators
  readonly successModal: Locator;
  readonly modalTitle: Locator;
  readonly modalTableRows: Locator;

  private static readonly GENDER_MAP = {
    Male: 'gender-radio-1',
    Female: 'gender-radio-2',
    Other: 'gender-radio-3',
  } as const;

  private static readonly HOBBY_MAP = {
    Sports: 'hobbies-checkbox-1',
    Reading: 'hobbies-checkbox-2',
    Music: 'hobbies-checkbox-3',
  } as const;

  constructor(private readonly page: Page) {
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.mobile = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.currentAddress = page.locator('#currentAddress');
    this.submitButton = page.locator('#submit');

    this.successModal = page.locator('.modal-content');
    this.modalTitle = this.successModal.locator('#example-modal-sizes-title-lg');
    this.modalTableRows = this.successModal.locator('tbody tr');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async fillName(first: string, last: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async selectGender(gender: 'Male' | 'Female' | 'Other') {
    const id = PracticeFormPage.GENDER_MAP[gender];
    await this.page.locator(`label[for="${id}"]`).click();
  }

  async fillMobile(mobile: string) {
    await this.mobile.fill(mobile);
  }

  async selectDateOfBirth(day: string, month: string, year: string) {
    await this.dateOfBirthInput.click();
    await this.page.locator('.react-datepicker__month-select').selectOption(month);
    await this.page.locator('.react-datepicker__year-select').selectOption(year);
    const dayPadded = day.padStart(3, '0');
    await this.page
      .locator(`.react-datepicker__day--${dayPadded}:not(.react-datepicker__day--outside-month)`)
      .click();
  }

  async addSubjects(subjects: string[]) {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject);
      await this.page.locator('.subjects-auto-complete__option').first().click();
    }
  }

  async selectHobbies(hobbies: ('Sports' | 'Reading' | 'Music')[]) {
    for (const hobby of hobbies) {
      const id = PracticeFormPage.HOBBY_MAP[hobby];
      await this.page.locator(`label[for="${id}"]`).click();
    }
  }

  async fillCurrentAddress(address: string) {
    await this.currentAddress.fill(address);
  }

  async selectState(stateOptionIndex: number) {
    await this.page.locator('#state').click();
    await this.page.locator(`#react-select-3-option-${stateOptionIndex}`).click();
  }

  async selectCity(cityOptionIndex: number) {
    await this.page.locator('#city').click();
    await this.page.locator(`#react-select-4-option-${cityOptionIndex}`).click();
  }

  async submit() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click({ force: true });
  }

  async fillAndSubmit(data: StudentFormData) {
    await this.fillName(data.firstName, data.lastName);
    await this.fillEmail(data.email);
    await this.selectGender(data.gender);
    await this.fillMobile(data.mobile);
    await this.selectDateOfBirth(data.dateOfBirth.day, data.dateOfBirth.month, data.dateOfBirth.year);
    await this.addSubjects(data.subjects);
    await this.selectHobbies(data.hobbies);
    await this.fillCurrentAddress(data.currentAddress);
    await this.selectState(1); // state index
    await this.selectCity(1);  // city index
    await this.submit();
  }

  async getModalRowValue(rowIndex: number): Promise<string> {
    return this.modalTableRows.nth(rowIndex).locator('td').last().textContent() ?? '';
  }

  async closeModal() {
    await this.page.keyboard.press('Escape');
  }
}
