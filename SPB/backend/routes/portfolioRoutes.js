import {Router} from 'express'
import { getPortfolio } from '../controllers/portfolioControllers.js';


const router = new Router();

router.get('/:userName',getPortfolio);


export default router;