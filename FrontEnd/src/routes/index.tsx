import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout/index";
import { Home } from "@Pages/Home";
import { NotFound } from "@Pages/NotFound";
import { Chat } from "@Pages/Chat";
import { Ong } from "@Pages/Organization";
import { SignIn } from "@Pages/User/SignIn";
import { Login } from "@Pages/User/Login";
import ListAnimal from "@Pages/Animal/index";
import CreateAnimal from "@Pages/Animal/Create";
import ShowAnimal from "@Pages/Animal/Show";

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
  );
}

export default MainRoutes;
