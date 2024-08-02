import axios from 'axios';
import * as cheerio from 'cheerio';
import ProductModel from '../models/product.model';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchDescription = async (productLink: string): Promise<string> => {
    try {
        const response = await axios.get(`https://www.amazon.com${productLink}`);
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

const fetchProducts = async (category: string) => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=' + category);
        const html = response.data;
        const $ = cheerio.load(html);
        const products: any[] = [];

        const productElements = $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20');
        
        for (let i = 0; i < 1; i++) { // Change to productElements.length to scrape all products
            const el = productElements[i];
            const product = $(el);

            const name = product.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
            const image = product.find('img.s-image').attr('src');
            const link = product.find('a.a-link-normal.a-text-normal').attr('href');
            const price = product.find('span.a-price > span.a-offscreen').text().replace('$', '') || '0';

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
                link: `https://www.amazon.com${link}`,
                price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
                quantity: Math.floor(Math.random() * 100) + 1,
                image,
                category: category,
                isActive: true
            };

            products.push(elements);
            await delay(1000);
        }
        return products;

    } catch (error) {
        console.error("Error fetching products: ", error);
    }
};

const saveToMongoDB = async (products: any[]) => {
    try {
        for (const product of products) {
            const existingProduct = await ProductModel.findOne({ name: product.name });
            if (!existingProduct) {
                await ProductModel.create(product);
                console.log(`Inserted: ${product.name}`);
            } else {
                console.log(`Skipped: ${product.name} - already exists`);
            }
        }
        console.log('All products processed.');
    } catch (error) {
        console.error("Error inserting documents: ", error);
    }
};

const scrapeAndSaveProducts = async (catagories: string[]) => {
    for (const category of catagories) {
        const products = await fetchProducts(category);
        if (products && products.length > 0) {
            await saveToMongoDB(products);
        }
    }
};

export { scrapeAndSaveProducts };
