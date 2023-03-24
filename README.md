## NODE

Utilizar a versão do node 16.18

## Ao baixar o projeto para sua maquina

Sempre rodar o comando "npm install" no seu cmd dentro da pasta que está o projeto

para rodar o projeto, não utilizar o livePreview, utilizar o comando "npm start" ou "npm run start"

tambem é possivel utilizar o YARN:

Sempre rodar o comando "yarn" no seu cmd dentro da pasta que está o projeto

para rodar o projeto, não utilizar o livePreview, utilizar o comando "yarn start"

## Referenciar imagem

Para referenciar as imagens no código, utilizar a seguinte sintaxe:

antes do return, onde ficam os imports:
import NomeDaImagem from "./caminhodaimagem/imagem.svg";

no código:
<img src={NomeDaImagem}>

Recomendável sempre utilizar o alt="" nas imagens

## Utilizar CSS

Ao invés de utilizar class="nomedaclasse", utilizar className="nomedaclasse"

Para linkar o css:
import "./styles.css";

## Comentários

Após o Return() :
{/_ Seu comentário _/}

Antes do Return() ou no css:

// Seu comentário

## Chamar uma outra tela

Ao invés de utilizar: <a href="paginadesejada.html">

Utilizar:

<NavLink to="/PaginaDesejada">
<button>Nome do botão</button>
</NavLink>

para saber o que usar em to="", verificar no arquivo Router.tsx
<Route path="/PaginaDesejada" element={<PaginaDesejada />} />
precisa estar igual o path=""

## Padrão na criação de pastas

Ao criar uma nova página, ir em Pages e criar uma nova pasta, Ex:

"SuaPagina" dentro dela deverá conter dois arquivos:

index.tsx

styles.css

Padrão do index.tsx = export function SuaPagina(){
return(
Seu código
)
}

Após isso criar o <Route path="/SuaPagina" element={<SuaPagina />} /> conforme os outros exemplos

## Recomendações em cada arquivo css

Recomendado sempre iniciar o código com:

- {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

Alguns navegadores tem uma margin ou padding padrão dentro deles, isto faz com que remova este padrão e deixe todas as paginas padronizadas em qualquer navegador
