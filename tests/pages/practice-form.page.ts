import { type Page, type Locator } from '@playwright/test';
import { Actions } from '../utils/actions';

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
  readonly actions: Actions;

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
    this.actions = new Actions(page);

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
    await this.actions.goto('https://demoqa.com/automation-practice-form');
  }

  async fillName(first: string, last: string) {
    await this.actions.fill(this.firstName, first, "First name");
    await this.actions.fill(this.lastName, last, "Last name");
  }

  async fillEmail(email: string) {
    await this.actions.fill(this.email, email, "Email");
  }

  async selectGender(gender: 'Male' | 'Female' | 'Other') {
    const id = PracticeFormPage.GENDER_MAP[gender];
    await this.actions.clickByLocator(`label[for="${id}"]`, `Gender: ${gender}`);
  }

  async fillMobile(mobile: string) {
    await this.actions.fill(this.mobile, mobile, "Mobile number");
  }

  async selectDateOfBirth(day: string, month: string, year: string) {
    await this.actions.click(this.dateOfBirthInput, "Date of birth input");
    await this.actions.selectOption(this.page.locator('.react-datepicker__month-select'), month, "Month");
    await this.actions.selectOption(this.page.locator('.react-datepicker__year-select'), year, "Year");
    const dayPadded = day.padStart(3, '0');
    await this.actions.click(
      this.page.locator(`.react-datepicker__day--${dayPadded}:not(.react-datepicker__day--outside-month)`),
      `Day: ${day}`
    );
  }

  async addSubjects(subjects: string[]) {
    for (const subject of subjects) {
      await this.actions.fill(this.subjectsInput, subject, `Subject: ${subject}`);
      await this.actions.click(this.page.locator('.subjects-auto-complete__option').first(), `Select subject: ${subject}`);
    }
  }

  async selectHobbies(hobbies: ('Sports' | 'Reading' | 'Music')[]) {
    for (const hobby of hobbies) {
      const id = PracticeFormPage.HOBBY_MAP[hobby];
      await this.actions.clickByLocator(`label[for="${id}"]`, `Hobby: ${hobby}`);
    }
  }

  async fillCurrentAddress(address: string) {
    await this.actions.fill(this.currentAddress, address, "Current address");
  }

  async selectState(stateOptionIndex: number) {
    await this.actions.click(this.page.locator('#state'), "State dropdown");
    await this.actions.click(this.page.locator(`#react-select-3-option-${stateOptionIndex}`), `State option ${stateOptionIndex}`);
  }

  async selectCity(cityOptionIndex: number) {
    await this.actions.click(this.page.locator('#city'), "City dropdown");
    await this.actions.click(this.page.locator(`#react-select-4-option-${cityOptionIndex}`), `City option ${cityOptionIndex}`);
  }

  async submit() {
    await this.actions.forceClick(this.submitButton, "Submit button");
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
    await this.actions.pressKey('Escape', "Close modal");
  }
}
