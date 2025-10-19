import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import MainRoutes from './routes/index'
import cors from 'cors'
import http from 'http'
import { chat } from './chat'
import { syncDatabase } from '@Models/index'

dotenv.config()

const server = express()
server.use(express.json())
server.use(cors())

server.use(express.static(path.join(__dirname, './uploads')))

server.use(MainRoutes)

server.use((req: Request, res: Response) => {
  res.status(404).send('Página não encontrada')
})

export const serverHTTP = http.createServer(server)

serverHTTP.listen(process.env.PORT, async () => {
  try {
    await syncDatabase()

    // eslint-disable-next-line no-console
    console.log('Servidor iniciado...')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao sincronizar o banco:', error)
  }
})

chat()
