import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { DefaultLayout } from '../layouts/DefaultLayout/index'
import { Home } from '@Pages/Home'
import { NotFound } from '@Pages/NotFound'
import { Chat } from '@Pages/Chat'
import { Ong } from '@Pages/Organization'
import { SignIn } from '@Pages/User/create'
import { Login } from '@Pages/User/Login'
import { ListAnimal } from '@Pages/Animal/List/index'
import { CreateAnimalForm } from '@Pages/Animal/Create'
import { ShowAnimal } from '@Pages/Animal/Show'
import { ShowUser } from '@Pages/User/show'

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Animal */}

          <Route path="/animal" element={<ShowAnimal />} />

          <Route path="/animals" element={<ListAnimal />} />

          <Route path="/animal/cadastrar" element={<CreateAnimalForm />} />

          {/* User */}

          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignIn />} />

          <Route path="/usuario" element={<ShowUser />} />

          <Route path="/chat" element={<Chat />} />

          <Route path="/ongs" element={<Ong />} />

          <Route path="/" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
