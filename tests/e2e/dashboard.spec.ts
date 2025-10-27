import { test, expect } from '@playwright/test'

test.describe('AWS Services Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the dashboard title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /AWS Services Monitor/i })).toBeVisible()
  })

  test('should display stats cards', async ({ page }) => {
    await expect(page.getByText(/Healthy Services/i)).toBeVisible()
    await expect(page.getByText(/Degraded Services/i)).toBeVisible()
    await expect(page.getByText(/Down Services/i)).toBeVisible()
    await expect(page.getByText(/Total Resources/i)).toBeVisible()
  })

  test('should display dashboard tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Overview/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /EC2/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /S3/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Lambda/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Databases/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Costs/i })).toBeVisible()
  })

  test('should navigate to EC2 tab', async ({ page }) => {
    await page.getByRole('tab', { name: /EC2/i }).click()
    await expect(page.getByText(/EC2 Instances/i)).toBeVisible()
  })

  test('should navigate to S3 tab', async ({ page }) => {
    await page.getByRole('tab', { name: /S3/i }).click()
    await expect(page.getByText(/S3 Buckets/i)).toBeVisible()
  })

  test('should navigate to Lambda tab', async ({ page }) => {
    await page.getByRole('tab', { name: /Lambda/i }).click()
    await expect(page.getByText(/Lambda Functions/i)).toBeVisible()
  })

  test('should navigate to Databases tab', async ({ page }) => {
    await page.getByRole('tab', { name: /Databases/i }).click()
    await expect(page.getByText(/RDS Instances/i)).toBeVisible()
  })

  test('should navigate to Costs tab', async ({ page }) => {
    await page.getByRole('tab', { name: /Costs/i }).click()
    await expect(page.getByText(/Total Monthly Cost/i)).toBeVisible()
  })

  test('should display service cards in overview', async ({ page }) => {
    // Wait for services to load
    await page.waitForTimeout(1000)

    // Check if service cards are present
    const serviceCards = page.locator('[class*="card"]')
    await expect(serviceCards.first()).toBeVisible()
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { name: /AWS Services Monitor/i })).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: /AWS Services Monitor/i })).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: /AWS Services Monitor/i })).toBeVisible()
  })
})
