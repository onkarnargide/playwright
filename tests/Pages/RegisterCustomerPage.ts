import { Page, Locator, expect } from '@playwright/test';
import { CommonPage } from './global.Setup';

export class RegisterCustomer extends CommonPage {
    readonly registerLink: Locator;
    readonly registerBtn: Locator;
    readonly registerPageTitle: Locator;
    readonly genderMaleRadioBtn: Locator;
    readonly genderFemaleRadioBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailAddress: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly submitRegisterBtn: Locator;
    readonly registerSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.registerLink = page.locator('a[href="/register?returnUrl=%2F"]');

        //alternative way to locate the register button
        //this.registerBtn = page.getByRole('link', { name: 'Register' });
        this.registerBtn = page.locator('a[href="/register?returnUrl=%2F"]');
        this.registerPageTitle = page.locator('.page-title');
        this.genderMaleRadioBtn = page.locator('#gender-male');
        //this.genderFemaleRadioBtn = page.getByLabel('Female');
        //this.genderFemaleRadioBtn = page.getByRole('radio', { name: 'Female' });

        this.genderFemaleRadioBtn = page.locator('#gender-female');
        
        this.firstNameInput = page.locator('#FirstName');
        //this.lastNameInput = page.getByPlaceholder('Last name');
        //this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });    
        //this.lastNameInput = page.getByLabel('Last name');
        //this.lastNameInput = page.locator('#LastName');
        this.lastNameInput = page.locator('#LastName');
        this.emailAddress = page.locator('input[name="Email"]');
        this.password = page.locator('#Password');
        this.confirmPassword = page.locator('#ConfirmPassword');
        //this.submitRegisterBtn = page.getByRole('button', { name: 'Register' });
        //this.submitRegisterBtn = page.getByText('Register', { exact: true });
        this.submitRegisterBtn = page.locator('#register-button');
        //this.registerSuccessMessage = page.getByText('Your registration completed');
        this.registerSuccessMessage = page.locator('.result');
    }


    /*
    Feature: Register Customer
    Scenario 1: Register a new male customer via dashboard
    Scenario 2: Register a new female customer via dashboard
    Scenario 3: Register a new customer via registeration page.     
        Given I am on the registration page.
    */
    //S1: Home page register functionality.
    async registerMaleCustomer(firstName: string, lastName: string, password: string, email: string): Promise<boolean> {

        expect(this.registerBtn).toBeVisible();
        await this.registerBtn.click();
        await this.page.waitForLoadState('load');

        await this.genderMaleRadioBtn.check();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailAddress.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.submitRegisterBtn.click();

        //alternative way to wait for page load after clicking the register button
        await this.page.waitForLoadState('load');
        //await this.page.waitForLoadState('domcontentloaded');
        //await this.page.waitForLoadState('networkidle');


        //Alternative way to wait for the success message to be visible
        //await this.registerSuccessMessage.waitFor({ state: 'visible' });
        //await this.page.waitForSelector('.result', { state: 'visible' });
        

        await this.registerSuccessMessage.waitFor({ state: 'visible' });


        return await this.registerSuccessMessage.isVisible();
    }

    //S2: Home page register functionality.
    async registerFemaleCustomer(firstName: string, lastName: string, password: string, email: string): Promise<boolean> {
        await this.registerBtn.click();
        await this.page.waitForLoadState('load');


        await this.genderFemaleRadioBtn.check();


        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailAddress.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.submitRegisterBtn.click();

        await this.page.waitForLoadState('load');
        
        await this.registerSuccessMessage.waitFor({ state: 'visible' });


        return await this.registerSuccessMessage.isVisible();
    }

    async verifyRegisterSuccessMessage(): Promise<string | null> {
        await this.registerSuccessMessage.waitFor({ state: 'visible' });
        return await this.registerSuccessMessage.textContent();
    }

    //Locates to Cart Page.    
    async clickOnContinueButton(): Promise<void> {
        
        //Important: Class method values are given .className, so we need to use the class name in the locator
        const continueBtn = this.page.locator('a.button-1.register-continue-button');
        await continueBtn.click();
    }

    //Locates to Home Page.
    async continueToHomePage(): Promise<void> {
        await this.page.goto("https://demo.nopcommerce.com/");
    }

}

