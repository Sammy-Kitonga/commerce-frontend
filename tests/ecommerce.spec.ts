import {test,expect} from '@playwright/test'

// const FRONTEND_URL='https://commerce-frontend-seven.vercel.app'
const FRONTEND_URL='https://localhost:3000'

const BACKEND_URL='https://mpesa-backend-pj42.onrender.com/api'

test.describe('Fullstack tests',()=>{
    test('Homepage UI and cart flow',async ({page})=>{
        await page.goto(FRONTEND_URL)
        await expect(page.getByRole('heading',{name:'Bestsellers'})).toBeVisible()

        const firstProductCard=page.locator('.group').first()
        // await page.locator('text=Apple').first().click()

        await expect(firstProductCard).toBeVisible({timeout:10000})

        await firstProductCard.hover()

        // await page.getByRole('button',{name:'Add to cart'}).first().click()

        await page.getByRole('button',{name:'Add to Cart'}).first().click()

        const cartBadge = page.locator('.bg-\\[\\#d4ff00\\]').first();
        await expect(cartBadge).toBeVisible()
    })
})

test('Backend Api Validation',async({request})=>{
    const response=await request.get(`${BACKEND_URL}/products`)
    expect(response.ok()).toBeTruthy()
    const products= await response.json()
    expect(Array.isArray(products)).toBeTruthy()
    expect(products.length).toBeGreaterThan(0)
    expect(products[0]).toHaveProperty('imageURl')
})

test('Checkout flow and payment UI',async({page})=>{
    await page.goto(FRONTEND_URL)
    const firstProductCard=page.locator('.group').first()
    await expect(firstProductCard).toBeVisible({timeout:10000})
    await firstProductCard.hover()
    await page.getByRole('button',{name:'Add to cart'}).first().click()
    await page.goto(`${FRONTEND_URL}/checkout`)
    await expect(page.getByRole('heading',{name:'Checkout'})).toBeVisible()

    const phoneInput=page.getByRole('textbox')
    await phoneInput.fill('254700000000')
    await page.getByRole('button',{name:'/Pay KES/i'}).click()

    await expect(page.getByText('Payment initiated')).toBeVisible({timeout:15000})
})

