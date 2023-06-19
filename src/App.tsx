import { ColaboradorContextProvider } from "./Context/ColaboradorContext";
import { EmpresaContextProvider } from "./Context/EmpresaContext";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";
import { UsuarioContextProvider } from "./Context/UsuarioContext";
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <UsuarioContextProvider>
          <ColaboradorContextProvider>
            <EmpresaContextProvider>
              <Router />
            </EmpresaContextProvider>
          </ColaboradorContextProvider>
        </UsuarioContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
