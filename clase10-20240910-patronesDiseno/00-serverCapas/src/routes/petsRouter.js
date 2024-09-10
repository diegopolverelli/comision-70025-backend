import { Router } from 'express';
import { getPetById, getPets } from '../controller/petsController.js';
export const router=Router()

router.get('/', getPets)
router.get('/:id', getPetById)