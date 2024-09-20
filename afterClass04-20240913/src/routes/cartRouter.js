import { Router } from 'express';
import { addProductToCart, createCart } from '../controller/CartController.js';
import passport from 'passport';
export const router=Router()

router.post('/', createCart)
router.post("/:cid/product/:pid", passport.authenticate("current", {session:false}), addProductToCart)