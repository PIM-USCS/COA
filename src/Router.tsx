import { Route, Routes } from "react-router-dom";
import { CadastroCliente } from "./pages/CadastroCliente";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TrocarSenha } from "./pages/TrocarSenha";
import { CadastroColaborador } from "./pages/CadastroColaborador";
import { AlterarCadastroCliente } from "./pages/AlterarCadastroCliente";
import { AlterarCadastroColaborador } from "./pages/AlterarCadastroColaborador";
import { EmpresaLista } from "./pages/Clientes";
import { ColaboradorLista } from "./pages/Colaborador";
import { ConsultaCliente } from "./pages/ConsultarCliente";
import { ConsultaColaborador } from "./pages/ConsultaColaborador";

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
      <Route path="/empresas" element={<EmpresaLista />} />
      <Route path="/Colaborador" element={<ColaboradorLista />} />
      <Route path="/consultar-cliente" element={<ConsultaCliente />} />
      <Route path="/consultar-colaborador" element={<ConsultaColaborador />} />
    </Routes>
  );
}
