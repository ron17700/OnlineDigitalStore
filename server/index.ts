import path from "path";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

import mainRoutes from './routes/index';
import errorHandler from './middlewares/errorHandler';
import { isAuthorized } from "./middlewares/auth";
import { scrapeAndSaveProducts } from './scraper';

dotenv.config({ path: path.join(__dirname, "./.env") });

process.env.rootDir = __dirname;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/", isAuthorized, mainRoutes);

app.use(errorHandler);

const start = async () => {
    try {
        console.log('Trying to connect to MongoDB...\n');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connected successfully\n');
        if (process.env.SCRAPE_ON_STARTUP === 'true') {
            console.log('Scraping and saving products...\n');
            await scrapeAndSaveProducts();
            console.log('Products scraped and saved successfully\n');
        }
    } catch (error) {
        console.error((error as Error).message);
        console.log((error as Error).stack);
    }
    
    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}\n`);
    });
};

start();
