import test, { expect } from '@playwright/test';
import { LoginCustomer } from './Pages/LoginCustomerPage';
import { RegisterCustomer } from './Pages/RegisterCustomerPage';
import { CommonPage } from './Pages/global.Setup';

test.describe('E2E Test Suite', () => {
    test.beforeEach(async ({ page }) => {
        /*// Initialize the CommonPage instance
        const commonPage = new CommonPage(page);
        await commonPage.navigateToHomePage();
        */

        await page.waitForLoadState('load');

        const commonPage = new CommonPage(page);
        await commonPage.navigateToHomePage();
        await commonPage.verifyHeaderTitle();
        });

    test('Register Customer', async ({page}) => {
        const registerCustomer = new RegisterCustomer(page);
        //const loginCustomer = new LoginCustomer(page);

        await expect(registerCustomer.registerBtn).toBeVisible();

        const firstName = 'John';
        const lastName = 'Doe';
        const password = 'Password123!';
        const email = `john.doe123@example.com`; // Generate a unique email address

        // Register a new male customer
        const isMaleRegistered = await registerCustomer.registerMaleCustomer(firstName, lastName, password, email);
        await expect(isMaleRegistered).toBe(true);
        await expect(registerCustomer.registerSuccessMessage).toBeVisible();

        // Log in with the newly registered male customer   


        
    });
    test('Positive: Login Customer with valid credentials', async ({ page }) => {
        const loginCustomer = new LoginCustomer(page);
        const email = `john.doe123@example.com`;
        const password = 'Password123!';

        await loginCustomer.loginCustomerWithValidCredentials(email, password);
        await expect(loginCustomer.headerTitle).toBeVisible();
        await expect(loginCustomer.headerTitle).toHaveText('nopCommerce demo store. Shopping Cart');
        await expect(loginCustomer.logoutLink).toBeVisible();
    });

    test('Negative: Login Customer with invalid password', async ({ page }) => {
        const loginCustomer = new LoginCustomer(page);
        const email = 'john.doe123@example.com';
        const password = 'WrongPassword123!';

        await loginCustomer.loginCustomerWithInvalidCredentials(email, password);
        await expect(loginCustomer.loginErrorMessage).toContainText('Login was unsuccessful');
    });

    test('Negative: Login Customer with invalid email format', async ({ page }) => {
        const loginCustomer = new LoginCustomer(page);
        const email = 'not-an-email';
        const password = 'Password123!';

        await loginCustomer.loginCustomerWithInvalidEmailFormat(email, password);
        await expect(loginCustomer.emailAddress).rejects.toHaveValue(email);
    });

    test('Negative: Login Customer with empty email', async ({ page }) => {
        const loginCustomer = new LoginCustomer(page);
        const password = 'Password123!';

        await loginCustomer.loginCustomerWithEmptyEmail(password);
        await expect(loginCustomer.emailAddress).toBeEmpty();
        //await expect(loginCustomer.emailAddress).toBeEmpty
    });

    test('Negative: Login Customer with empty password', async ({ page }) => {
        const loginCustomer = new LoginCustomer(page);
        const email = 'john.doe123@example.com';

        await loginCustomer.loginCustomerWithEmptyPassword(email);
        await expect(loginCustomer.password).toBeEmpty();
    });
});