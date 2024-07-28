import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import ProductModel from '../models/product.model';

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
            const reviews = product.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small').children('span').last().attr('aria-label') || 'No reviews';
            const stars = product.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label') || 'No rating';
            const price = product.find('span.a-price > span.a-offscreen').text().replace('$', '') || '0';

            let elements = {
                name,
                description: link, // Placeholder for description
                price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
                quantity: 1, // Default quantity
                image,
                reviews,
                stars,
                category: null, // Placeholder for category
                isActive: true
            };

            products.push(elements);
        });

        // CSV file creation - DEBBUGING PURPOSES
        // let csvContent = products.map(element => {
        //     return Object.values(element).map(item => `"${item}"`).join(',');
        // }).join("\n");

        // fs.writeFile('saved-shelves.csv', "Title, Image, Link, Price, Quantity, Category, isActive, Reviews, Stars" + '\n' + csvContent, 'utf8', function (err: NodeJS.ErrnoException | null) {
        //     if (err) {
        //         console.log('Some error occurred - file either not saved or corrupted.');
        //     } else {
        //         console.log('File has been saved!');
        //     }
        // });

        return products;
    } catch (error) {
        throw error;
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
                console.log(`Skipped: ${product.name} (already exists)`);
            }
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
