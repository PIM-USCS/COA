import { Route, Routes } from "react-router-dom";
import { CadastroCliente } from "./pages/CadastroEmpresa";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TrocarSenha } from "./pages/TrocarSenha";
import { CadastroColaborador } from "./pages/CadastroColaborador";
import { AlterarCadastroCliente } from "./pages/AlterarCadastroEmpresa";
import { AlterarCadastroColaborador } from "./pages/AlterarCadastroColaborador";
import { EmpresaLista } from "./pages/Empresas";
import { ColaboradorLista } from "./pages/Colaborador";
import { ConsultaCliente } from "./pages/ConsultarEmpresa";
import { ConsultaColaborador } from "./pages/ConsultaColaborador";
import { AlterarUsuario } from "./pages/AlterarUsuario";
import { RecuperarSenha } from "./pages/RecuperarSenha";
import { CobrancaLista } from "./pages/Cobrancas";
import { CadastroCobranca } from "./pages/CadastroCobranca";
import { ConsultaCobranca } from "./pages/ConsultaCobranca";
import { TrocarSenhaToken } from "./pages/TrocarSenhaToken";
import { Dashboard } from "./pages/Dashboard";
import { EnviarRecibo } from "./pages/EnviarRecibo";
import { AlterarCobranca } from "./pages/AlterarCobranca";
import { TiposguiaLista } from "./pages/Tiposguia";
import { CadastroTiposguia } from "./pages/CadastroTiposguia";
import { AlterarTipoguia } from "./pages/AlterarTiposguia";

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
      <Route path="/alterar-usuario" element={<AlterarUsuario />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/cobrancas" element={<CobrancaLista />} />
      <Route path="/cadastro-cobrancas" element={<CadastroCobranca />} />
      <Route path="/consultar-cobranca" element={<ConsultaCobranca />} />
      <Route path="/resetar-senha" element={<TrocarSenhaToken />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/enviar-recibo" element={<EnviarRecibo />} />
      <Route path="/alterar-cobranca" element={<AlterarCobranca />} />
      <Route path="/tiposguia" element={<TiposguiaLista />} />
      <Route path="/cadastro-tiposguia" element={<CadastroTiposguia />} />
      <Route path="/alterar-tipoguia" element={<AlterarTipoguia />} />
    </Routes>
  );
}
