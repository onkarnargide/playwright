import {Page, Locator} from '@playwright/test';

declare const process: {
    env: {
        CI?: string;
    };
};

export class CommonPage { 
    readonly page: Page;
    readonly headerTitle: Locator;
    readonly homePageUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.headerTitle = page.getByTitle("nopCommerce demo store. Shopping Cart");
        this.homePageUrl = "http://demo.nopcommerce.com/";
    }


    async verifyHeaderTitle(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.headerTitle.waitFor({ state: 'visible' });
        const titleText = await this.headerTitle.textContent();
        console.log('Header Title:', titleText);
    }

    async navigateToHomePage(): Promise<void>{
        await this.page.goto(this.homePageUrl, { waitUntil: 'domcontentloaded' });

        const challengeDetected = await this.page
            .waitForFunction(() => {
                const title = document.title.toLowerCase();
                const body = document.body?.innerText.toLowerCase() ?? '';
                return title.includes('just a moment') ||
                    body.includes('verify you are human') ||
                    body.includes('checking your browser');
            }, { timeout: 5000 })
            .then(() => true)
            .catch(() => false);

        if (!challengeDetected) {
            return;
        }

        if (process.env.CI) {
            throw new Error(
                'Cloudflare security verification blocked the test. Run this test headed locally, complete the verification manually, and reuse the authenticated browser state.'
            );
        }

        console.log('Cloudflare verification detected. Complete it in the headed browser window.');
        await this.page.waitForFunction(() => {
            const title = document.title.toLowerCase();
            const body = document.body?.innerText.toLowerCase() ?? '';
            return !title.includes('just a moment') &&
                !body.includes('verify you are human') &&
                !body.includes('checking your browser');
        }, { timeout: 120000 });
    }
}