import { Route, Routes } from "react-router-dom";
import { CadastroCliente } from "./pages/CadastroCliente";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TrocarSenha } from "./pages/TrocarSenha";
<<<<<<< HEAD
import { CadastroColaborador } from "./pages/CadastroColaborador";
=======
import { CadastroColaborador} from "./pages/CadastroColaborador";
import { AlterarCadastroCliente} from "./pages/AlterarCadastroCliente";
import { AlterarCadastroColaborador} from "./pages/AlterarCadastroColaborador";

>>>>>>> 5051055eddebb6dd159de438ad3004ab75aaebe6

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/trocar-senha" element={<TrocarSenha />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/cadastro-cliente" element={<CadastroCliente />} />
      <Route path="/cadastro-colaborador" element={<CadastroColaborador />} />
      <Route path="/AlterarCadastroCliente" element={<AlterarCadastroCliente />} />
      <Route path="/AlterarCadastroColaborador" element={<AlterarCadastroColaborador/>} />
    </Routes>
  );
}
