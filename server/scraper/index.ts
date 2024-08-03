import axios from 'axios';
import * as cheerio from 'cheerio';
import { ICategory } from '../models/category.model';
import ProductService from '../services/product.service';
import CategoryService from '../services/category.service';

const axiosInstance = axios.create({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3029.110 Safari/537.3'
    }
});

const categories = ['tshirt', 'jeans', 'shoes', 'hat', 'socks'];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const fetchDescription = async (productLink: string): Promise<string> => {
    try {
        const response = await axiosInstance.get(`https://www.amazon.com${productLink}`);
        const html = response.data;
        const $ = cheerio.load(html);
        
        let description = $('#productDescription > p > span').text().trim();
        if (!description) {
            description = '';
        }
        
        return description;
    } catch (error) {
        console.error(`Error fetching description for ${productLink}: `, error);
        return '';
    }
};

const fetchProducts = async (category: ICategory) => {
    try {
        const response = await axiosInstance.get('https://www.amazon.com/s?k=' + category.name);
        const html = response.data;
        const $ = cheerio.load(html);
        const products: any[] = [];

        const productElements = $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20');
        const ProductCount = Math.min(10, productElements.length);
        
        for (let i = 0; i < ProductCount; i++) {
            const el = productElements[i];
            const product = $(el);

            const name = product.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
            const image = product.find('img.s-image').attr('src');
            const link = product.find('a.a-link-normal.a-text-normal').attr('href');
            const price = product.find('span.a-price > span.a-offscreen').text().replace('$', '') || (Math.floor(Math.random() * 500) + 100).toString();

            let description = '';
            if (link) {
                try {
                    description = await fetchDescription(link);
                    if (!description) {
                        description = name;
                    }
                } catch (error) {
                    description = name;
                }
            }

            let elements = {
                name,
                description,
                price: Math.round(parseFloat(price.replace(/[^0-9.-]+/g, ""))),
                quantity: Math.floor(Math.random() * 100) + 1,
                images: image ? [image] : [],
                category: category.id,
                isActive: true
            };
            console.log("Fetched: ", elements.name);

            products.push(elements);
            await delay((Math.random() * 6000) + 1000);
        }
        return products;

    } catch (error) {
        console.error("Error fetching products: ", error);
    }
};

const saveToMongoDB = async (products: any[], categoryName: string) => {
    for (const product of products) {
        try {
            await ProductService.createProduct(product);
            console.log(`Inserted: ${product.name}`);
        }
        catch (error) {
            console.log(`Skipped: ${product.name} - already exists`);
        }
    }
    console.log(`${categoryName} products processed.`);
};

const scrapeAndSaveProducts = async () => {
    for (const category of categories) {
        let categoryObj = {} as ICategory;
        try {
            console.log(`Creating category: ${category}`);
            await CategoryService.createCategory({ name: category } as any);
        }
        catch (error) {
            console.log(`Skipped: ${category} - already exists`);
        }
        finally {
            categoryObj = await CategoryService.getCategoryByName(category);
        }
        const products = await fetchProducts(categoryObj);
        if (products && products.length > 0) {
            await saveToMongoDB(products, category);
        }
    }
};

export { scrapeAndSaveProducts };
