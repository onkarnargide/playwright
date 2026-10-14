import { Page, Locator, expect } from '@playwright/test';
import { CommonPage } from './global.Setup';

export class LoginCustomer extends CommonPage {
    readonly loginLink: Locator;
    readonly loginBtn: Locator;
    readonly loginPageTitle: Locator;
    readonly emailAddress: Locator;
    readonly password: Locator;
    readonly submitLoginBtn: Locator;
    readonly loginErrorMessage: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);
        this.loginLink = page.locator('a[href="/login?returnUrl=%2F"]');
        this.loginBtn = page.locator('a[href="/login?returnUrl=%2F"]');
        this.loginPageTitle = page.locator('.page-title');

        //this.emailAddress = page.getByRole('textbox', { name: 'Email' });
        //this.emailAddress = page.getByLabel('Email');
        //Locator filter methods: 
        this.emailAddress = page.locator('input').filter({ has: page.getByLabel('Email') });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.submitLoginBtn = page.locator('button[type="submit"]');
        this.loginErrorMessage = page.locator('.message-error');
        this.logoutLink = page.locator('a[href="/logout"]');

        
    }

    async openLoginPage(): Promise<void> {
        await this.loginLink.click();
        await this.page.waitForLoadState('load');
        await expect(this.loginPageTitle).toBeVisible();
        await expect(this.loginPageTitle).toHaveText('Welcome, Please Sign In!');
    }

    async loginCustomer(email: string, password: string): Promise<void> {
        await this.openLoginPage();
        await this.emailAddress.fill(email);
        await this.password.fill(password);
        await expect(this.submitLoginBtn).toBeEnabled();
        await this.submitLoginBtn.click();
    }

    async loginCustomerWithValidCredentials(email: string, password: string): Promise<void> {
        await this.loginCustomer(email, password);
        await expect(this.page).toHaveURL(/\/customer\/info|\/$/);
    }

    async loginCustomerWithInvalidCredentials(email: string, password: string): Promise<void> {
        await this.loginCustomer(email, password);
        await this.loginErrorMessage.waitFor({ state: 'visible' });
    }

    async loginCustomerWithInvalidEmailFormat(email: string, password: string): Promise<void> {
        await this.openLoginPage();
        await this.emailAddress.fill(email);
        await this.password.fill(password);
        await this.submitLoginBtn.click();
    }

    async loginCustomerWithEmptyEmail(password: string): Promise<void> {
        await this.openLoginPage();
        await this.password.fill(password);
        await this.submitLoginBtn.click();
    }

    async loginCustomerWithEmptyPassword(email: string): Promise<void> {
        await this.openLoginPage();
        await this.emailAddress.fill(email);
        await this.submitLoginBtn.click();
    }
}
