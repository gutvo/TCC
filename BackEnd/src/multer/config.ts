import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file !== null || file !== undefined) {
      cb(null, 'src/images')
    }
  },
  filename: function (req, file, cb) {
    if (file !== null || file !== undefined) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.originalname.split('.')[1]

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = uuidv4()

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
  }
})

export const upload = multer({ storage })
