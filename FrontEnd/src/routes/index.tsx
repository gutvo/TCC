import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout/index'
import { Home } from '@pages/Home'
import { NotFound } from '@pages/NotFound'
import { Chat } from '@pages/Chat'
import { Ong } from '@pages/Organization'
import { SignIn } from '@pages/User/SignIn'
import { Login } from '@pages/User/Login'
import ListAnimal from '@pages/Animal/index'
import CreateAnimal from '@pages/Animal/Create'
import ShowAnimal from '@pages/Animal/Show'

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Animal */}
          <Route path="/animal/:Animalid" element={<ShowAnimal />} />
          <Route path="/animal" element={<ListAnimal />} />
          <Route path="/animal/cadastrar" element={<CreateAnimal />} />

          {/* User */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<SignIn />} />

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
