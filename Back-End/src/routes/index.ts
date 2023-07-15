import { Router } from 'express'
import * as animalController from '../controllers/animalController'
import multer from 'multer'

const router = Router()
const upload = multer({
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
});

router.get('/api/animais', animalController.getAnimais)
router.get('/api/animais/imagens/:id', animalController.getImgAnimal)
router.post(
  '/api/animais',
  upload.single('imagem'),
  animalController.insertAnimal,
)

export default router
