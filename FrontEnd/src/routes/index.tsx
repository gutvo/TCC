import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { DefaultLayout } from '../layouts/DefaultLayout/index'
import { Home } from '@Pages/Home'
import { NotFound } from '@Pages/NotFound'
import { Chat } from '@Pages/Chat'
import { ListOng } from '@Pages/Organization/List'
import { SignIn } from '@Pages/User/create/'
import { Login } from '@Pages/User/Login'
import { ListAnimal } from '@Pages/Animal/List/index'
import { CreateAnimalForm } from '@Pages/Animal/Create'
import { ShowAnimal } from '@Pages/Animal/Show'
import { ShowUser } from '@Pages/User/show'
import { ShowOng } from '@Pages/Organization/Show'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { RootState } from '@Redux/store'
import { Adoption } from '@Pages/Animal/Adoption'
import { Reports } from '@Pages/Reports'
import { useEffect } from 'react'
import socketIO from 'socket.io-client'
import { AdoptedAnimal } from '@Pages/Animal/Adopted'
import { AdoptedAnimalShow } from '@Pages/Animal/AdoptedShow'

const socket = socketIO(import.meta.env.VITE_LINK as string, {
  autoConnect: false,
})
function MainRoutes() {
  const { data, isLogged } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    if (data && isLogged) {
      socket.on('connect', () => console.log('Usuário conectado'))
      socket.auth = { userId: data.id }
      socket.connect()
    }
  }, [data, isLogged])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout container="lg" />}>
          {isLogged && data?.ongData && (
            <>
              <Route path="/animal/cadastrar" element={<CreateAnimalForm />} />
            </>
          )}
          <Route path="/animal" element={<ShowAnimal />} />
          <Route path="/animais/adotados" element={<AdoptedAnimal />} />
          <Route path="/animal/adotado" element={<AdoptedAnimalShow />} />

          <Route path="/relatorios" element={<Reports />} />

          {isLogged && <Route path="/usuario" element={<ShowUser />} />}

          <Route path="/ongs" element={<ListOng />} />

          <Route path="adocoes" element={<Adoption />} />

          <Route path="/ong" element={<ShowOng />} />

          <Route path="/" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/" element={<DefaultLayout container="xl" />}>
          <Route path="/animals" element={<ListAnimal />} />
        </Route>

        <Route path="/" element={<DefaultLayout />}>
          <Route path="/chat" element={<Chat socket={socket} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
