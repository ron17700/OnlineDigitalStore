import axios from 'axios';
import * as cheerio from 'cheerio';
import ProductModel from '../models/product.model';
import ProductService from "./product.service";

const fetchProducts = async () => {
    try {
        const response = await axios.get('https://www.amazon.com/s?k=tshirts&crid=YDCE2Z7B0P73&sprefix=tshirt%2Caps%2C204');
        const html = response.data;
        const $ = cheerio.load(html);
        const products: any[] = [];

        $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx: number, el: cheerio.Element) => {
            const product = $(el);

            const name = product.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
            const image = product.find('img.s-image').attr('src');
            const link = product.find('a.a-link-normal.a-text-normal').attr('href');
            const price = product.find('span.a-price > span.a-offscreen').text().replace('$', '') || '0';

            let elements = {
                name,
                description: name,
                link,
                price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
                quantity: 1,
                image,
                category: null,
                isActive: true
            };

            products.push(elements);
        });

        return products;
    } catch (error) {
        throw error;
    }
};

const saveToMongoDB = async (products: any[]) => {
    try {
        for (const product of products) {
            await ProductModel.create(product);
        }
        console.log('All products processed.');
    } catch (error) {
        console.error("Error inserting documents: ", error);
    }
};



const scrapeAndSaveProducts = async () => {
    const products = await fetchProducts();
    await saveToMongoDB(products);
};

export { scrapeAndSaveProducts };
