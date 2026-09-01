import express from 'express';
import { SeminarControllers } from './seminar.controller';

const router = express.Router();

// get single seminar
router.get('/:id', SeminarControllers.getSingleSeminar);

// get all seminars
router.get('/', SeminarControllers.getAllSeminars);

export const SeminarRoutes = router;
