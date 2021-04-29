import express from 'express';

import { createIntention, getIntentions, getIntention, updateIntention, deleteIntention } from '../controllers/intentions.js';

const router = express.Router();

router.post('/', createIntention);
router.get('/', getIntentions);
router.get('/:id', getIntention);
router.put('/:id', updateIntention);
router.delete('/:id', deleteIntention);

export default router;