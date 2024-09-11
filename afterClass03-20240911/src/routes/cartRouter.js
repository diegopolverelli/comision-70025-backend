import { Router } from 'express';
import { addProductToCart, createCart } from '../controller/CartController.js';
export const router=Router()

router.post('/', createCart)
router.post("/:cid/product/:pid", addProductToCart)