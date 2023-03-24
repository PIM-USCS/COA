import { useState } from "react"; /* Modal*/
import { CadastroCliente1 } from "./Componentes/CadastroCliente1";
import { EnviarGuia1 } from "./Componentes/EnviarGuia1";
import "./styles.css";
import logoTransparente from "../../img/COA linha/COA/favicon_1000x1000 recortada.png";

export function Home() {
  const [isOpen, setIsOpen] = useState(false); /*Modal*/
  const [isOpenEnviar, setIsOpenEnviar] = useState(false); /*Modal*/
  return (
    <>
      <main>
        <header>
          <div className="div-header">
            <div className="div-header-esquerda"></div>
            <div className="div-header-direita"></div>
          </div>
        </header>
      </main>
    </>
  );
}
