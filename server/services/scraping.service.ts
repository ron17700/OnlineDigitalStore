const axios = require("axios");
import * as cheerio from 'cheerio';
const fs = require('fs');
const ProductModel = require('../models/product.model.ts');

// Fetching data from Amazon
const fetchShelves = async () => {
   try {
        // Fetching HTML
        const response = await axios.get('https://www.amazon.com/s?crid=36QNR0DBY6M7J&k=shelves&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309');
        const html = response.data;
        const $ = cheerio.load(html);
        const shelves: any[] = [];

        $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx: number, el: cheerio.Element) => {
            const shelf = $(el)

            // Item Properties
            const title = shelf.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
            const image = shelf.find('img.s-image').attr('src')
            const link = shelf.find('a.a-link-normal.a-text-normal').attr('href')
            const reviews = shelf.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small').children('span').last().attr('aria-label')
            const stars = shelf.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label')
            const price = shelf.find('span.a-price > span.a-offscreen').text().replace('$', '') || '0';
           
            let elements: {
                title: any;
                image: any;
                link: string;
                price: number;
                quantity: number;
                category: string;
                isActive: boolean;
                reviews?: any;
                stars?: any;
            } = 
            {
                title,
                image,
                link: `https://amazon.com${link}`,
                price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
                quantity: 1,
                category: "test",
                isActive: true
            }

            if (reviews) {
                elements.reviews = reviews
            }
        
            if (stars) {
                elements.stars = stars
            }

            shelves.push(elements)
        });

        // Save data to CSV
        let csvContent = shelves.map(element => {
            return Object.values(element).map(item => `"${item}"`).join(',')
         }).join("\n")
         
         fs.writeFile('saved-shelves.csv', "Title, Image, Link, Price, Quantity, Category, isActive, Reviews, Stars" + '\n' + csvContent, 'utf8', function (err: NodeJS.ErrnoException | null) {
            if (err) {
              console.log('Some error occurred - file either not saved or corrupted.')
            } else{
              console.log('File has been saved!')
            }
         })

        return shelves;
    } catch (error) {
        throw error;
    }
};

const saveToMongoDB = async (shelves: any[]) => {
    try {
        // Insert shelves data into MongoDB
        const result = await ProductModel.insertMany(shelves);
        console.log(`${result.length} documents were inserted`);
    } catch (error) {
        console.error("Error inserting documents: ", error);
    }
};

const scrapeAndSaveShelves = async () => {
    const shelves = await fetchShelves();
    await saveToMongoDB(shelves);
};

export { scrapeAndSaveShelves };