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
      <body>
        <CadastroCliente1 isOpen={isOpen} setIsOpen={setIsOpen} />
        <EnviarGuia1
          isOpenEnviar={isOpenEnviar}
          setIsOpenEnviar={setIsOpenEnviar}
        />
        <header>
          <div>
            <img src={logoTransparente} />
            <input type="source" placeholder="busca"></input>
          </div>
        </header>

        <button onClick={() => setIsOpen(true)}>oi</button>
      </body>
    </>
  );
}
