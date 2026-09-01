import express from 'express';
import { ProductControllers } from './seminar.controller';

const router = express.Router();

// get single product
router.get('/:id', ProductControllers.getSingleProduct);

// get all products
router.get('/', ProductControllers.getAllProducts);

export const SeminarRoutes = router;
