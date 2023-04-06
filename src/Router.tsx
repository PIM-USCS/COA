import { Route, Routes } from "react-router-dom";
import { CadastroCliente } from "./pages/CadastroCliente";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TrocarSenha } from "./pages/TrocarSenha";
import { CadastroColaborador } from "./pages/CadastroColaborador";
import { AlterarCadastroCliente } from "./pages/AlterarCadastroCliente";
import { AlterarCadastroColaborador } from "./pages/AlterarCadastroColaborador";
import { ClienteLista } from "./pages/Clientes";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/trocar-senha" element={<TrocarSenha />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/cadastro-cliente" element={<CadastroCliente />} />
      <Route path="/cadastro-colaborador" element={<CadastroColaborador />} />
      <Route
        path="/alterar-cadastro-cliente"
        element={<AlterarCadastroCliente />}
      />
      <Route
        path="/alterar-cadastro-colaborador"
        element={<AlterarCadastroColaborador />}
      />
      <Route path="/clientes" element={<ClienteLista />} />
    </Routes>
  );
}
