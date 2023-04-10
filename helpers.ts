export async function loadHomePage(page) {
    await page.goto("https://test.salesforce.com/")
}

export async function assertTitle(page) {
    await page.waitForSelector('#usernamegroupA')
}