import multer from 'multer'
import { randomUUID } from 'node:crypto'

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
      const novoNomeArquivo = randomUUID()

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
  }
})

export const upload = multer({ storage })
