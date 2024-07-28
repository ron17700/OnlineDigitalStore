import { Router } from 'express';
import { scrapeAndSaveProducts } from '../services/scraping.service';

const router: Router = Router();

router.get('/', async (req, res) => {
    try {
        await scrapeAndSaveProducts();
        res.status(200).send('Scraping and saving process completed successfully.');
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});

export default router;