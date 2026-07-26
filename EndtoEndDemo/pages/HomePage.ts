import { expect, Page } from '@playwright/test';

export class HomePage{
    page: Page

    constructor(page: Page){
        this.page = page;
    }

    async validatetitle(page: Page){
        await expect(this.page).toHaveTitle(/Online Shopping, Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!/);
    }

}


