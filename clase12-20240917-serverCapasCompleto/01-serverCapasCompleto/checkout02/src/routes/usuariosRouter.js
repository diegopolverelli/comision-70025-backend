import { Router } from 'express';
import UsuariosController from '../controller/UsuariosController.js';
export const router=Router()

router.get('/', UsuariosController.getUsuarios)
router.post('/', UsuariosController.createUsuario)