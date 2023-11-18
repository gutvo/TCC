import multer from 'multer'
import { randomBytes } from 'crypto'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) {
      cb(null, 'src/uploads')
    }
  },
  filename: function (req, file, cb) {
    if (file) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.originalname.split('.')[1]

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = randomBytes(64).toString('hex')

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
  },
})

export const upload = multer({ storage })
