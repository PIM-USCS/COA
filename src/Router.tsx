import { Route, Routes } from "react-router-dom";
import { CadastroCliente } from "./pages/CadastroCliente";
import { EnviarGuia } from "./pages/EnviarGuia";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TrocarSenha } from "./pages/TrocarSenha";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/TrocarSenha" element={<TrocarSenha />} />
      <Route path="/EnviarGuia" element={<EnviarGuia />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/CadastroCliente" element={<CadastroCliente />} />
    </Routes>
  );
}
