import { Router } from 'express';
import ProductController from '../controller/ProductController.js';
export const router=Router()

router.post('/', ProductController.getProducts)