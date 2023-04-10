import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
  await page.goto('https://test.salesforce.com/')
  const pageUsernameInput = await page.locator(
    '#usernamegroup .label.usernamelabel'
  )
  await expect(pageUsernameInput).toContainText('Username')
})

test('Clicking on elements', async ({ page }) => {
  await page.goto('https://test.salesforce.com/')
  await page.click('text=Log In to Sandbox')
})

test.skip('Selectors', async ({ page }) => {
  await page.click('teext=some text')
  await page.click('button')
  await page.click('.btn')
  await page.click('#btn')
  await page.click('.submit-btn:visible')
  await page.click('#username.first')
  await page.click('//button')
})

test.describe('first test group', () => {
  test('Working with inputs @myTag', async ({ page }) => {
    await page.goto('https://test.salesforce.com/')
    // await page.type('#username', 'admin-bvrm@force.com.sebamaboxa')
    await page.type('#username', 'username-test')
    // await page.type('#password', 'Clorce9@')
    await page.type('#password', 'testPassword')
    await page.click('text=Log In to Sandbox')
    const errorMsg = await page.locator('#error.loginError')
    await expect(errorMsg).toContainText(
      "Please check your username and password. If you still can't log in, contact your Salesforce administrator."
    )
  })

  test('Assertion @myTag', async ({ page }) => {
    await page.goto('https://test.salesforce.com/')
    await expect(page).toHaveURL('https://test.salesforce.com/')
    await expect(page).toHaveTitle('Login | Salesforce')

    const element = await page.locator('.label.usernamelabel')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Username')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://test.salesforce.com/')
  })

  // test.afterEach(async ({ page }) => {})

  test('Screenshots', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('single element - Screenshots', async ({ page }) => {
    const specialElement = await page.$('#usernamegroup')
    await specialElement.screenshot({ path: 'single_el.png' })
  })
})

test.only('Custom helpers', async ({ page }) => {
  await loadHomePage(page)

  // await page.pause()

  await assertTitle(page)
})
