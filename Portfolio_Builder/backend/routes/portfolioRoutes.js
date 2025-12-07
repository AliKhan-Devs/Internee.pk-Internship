import {Router} from 'express'
import { getAdminPortfolio, getPortfolio } from '../controllers/portfolioControllers.js';
import {protect} from '../middlewares/authMiddleware.js'

const router = new Router();

router.get('/:userName',getPortfolio);
router.get('/my/portfolio',protect ,getAdminPortfolio);


export default router;