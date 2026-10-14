import { test, expect, Locator } from '@playwright/test';

test('Verifying page URL and title', async ({ page }) => {

    await page.goto(
        'https://practicetestautomation.com/practice-test-login/'
    );

    const currentUrl: string = page.url();

    console.log('URL:', currentUrl);

    await expect(page).toHaveURL(
        'https://practicetestautomation.com/practice-test-login/'
    );

    await expect(page).toHaveTitle(
        'Test Login | Practice Test Automation'
    );
});


test('Login page - Playwright locators', async ({ page }) => {

    await page.goto('https://demo.nopcommerce.com/');


    // 1. getByAltText()
    const logoImg: Locator =
        page.getByAltText('Picture for category Apparel');

    await expect(logoImg).toBeVisible();


    // 2. getByRole()
    const searchHeading: Locator =
        page.getByRole('heading', {
            name: 'Search store'
        });

    await expect(searchHeading).toBeVisible();


    // 3. getByPlaceholder()
    const searchBox: Locator =
        page.getByPlaceholder('Search store');

    await searchBox.fill('Iphone');

    await searchBox.clear();

    await searchBox.fill('Iphone 14 Pro Max');

    await expect(searchBox)
        .toHaveValue('Iphone 14 Pro Max');


    // 4. getByText()
    const giftCardsLink: Locator =
        page.getByText('Gift Cards');

    await expect(giftCardsLink).toBeVisible();
});