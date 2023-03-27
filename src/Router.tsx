import { Route, Routes } from "react-router-dom";
import { CadastroCliente } from "./pages/CadastroCliente";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TrocarSenha } from "./pages/TrocarSenha";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/TrocarSenha" element={<TrocarSenha />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/CadastroCliente" element={<CadastroCliente />} />
    </Routes>
  );
}
