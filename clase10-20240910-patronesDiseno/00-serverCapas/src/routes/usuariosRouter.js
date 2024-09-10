import { Router } from 'express';
import UsuariosController from '../controller/UsuariosController.js';
export const router=Router()

router.get('/', UsuariosController.getUsers)
router.get('/:id', UsuariosController.getUserById)
// router.post('/', UsuariosController.getUsers)