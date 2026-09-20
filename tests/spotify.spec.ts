import { test, expect } from '@playwright/test'

test.beforeEach(async({page})=>{
  await page.goto('http://localhost:5173');
})

test('spotify homepage open', async ({page})=>{
  // await page.goto('http://localhost:5173')
  // await expect(page.getByRole('heading',{name: 'Featured Charts'})).toBeVisible();
  await expect(page.getByText('Loading...')).toBeVisible();
  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByText('Loading...')).toBeHidden();
  await expect(page.getByRole('heading',{name:'Featured Charts'})).toBeVisible();
  await page.screenshot({
    path: 'screenshots/homepage.png',
    fullPage: true
  })
})

test('user can login and reach to admin homepag which will show admin button', async({page}) => {
  await expect(page.getByText('Login')).toBeVisible();
  await page.getByText('Login').click();
  await page.getByPlaceholder('email or username').fill('a@b.com');
  await page.getByPlaceholder('password').fill('ab');
  await page.getByRole('button',{name: 'Login'}).click();
  await expect(page.getByRole('button',{name: 'Admin Dashboard'})).toBeVisible();
  await page.screenshot({
    path:'screenshots/login.png',
    fullPage: true
  })
})

test('admin page display',async({page})=>{
  await expect(page.getByText('Login')).toBeVisible();
  await page.getByText('Login').click();
  await page.getByPlaceholder('email or username').fill('a@b.com');
  await page.getByPlaceholder('password').fill('ab');
  await page.getByRole('button',{name: 'Login'}).click();
  await page.getByRole('button',{name: 'Admin Dashboard'}).click();
  await expect(page.getByRole('link',{name: 'Go to homepage'})).toBeVisible();
  await page.screenshot({
    path:'screenshots/admin.png',
    fullPage: true
  })
})