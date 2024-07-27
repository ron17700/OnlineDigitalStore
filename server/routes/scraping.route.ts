import { Router } from 'express';
import { scrapeAndSaveShelves } from '../services/scraping.service';

const router: Router = Router();

router.get('/scrape', async (req, res) => {
    try {
        await scrapeAndSaveShelves();
        res.status(200).send('Scraping and saving process completed successfully.');
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
});

export default router;