import {test, expect} from '@playwright/test';


//Syntax
/*
test("title", () => {

})
*/

test('verifying page title for test 2', async({page})=> {
   
    await page.goto("https://practicetestautomation.com/practice-test-login/");

    let title1 = await page.title();
    console.log("Title:",title1,"secondtest");

    let url1 = await page.url();
    console.log("URL:",url1,"secondtest");

    await  expect(page).toHaveTitle("Test Login | Practice Test Automation");
})