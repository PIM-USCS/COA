import { ColaboradorContextProvider } from "./Context/ColaboradorContext";
import { EmpresaContextProvider } from "./Context/EmpresaContext";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <ColaboradorContextProvider>
          <EmpresaContextProvider>
            <Router />
          </EmpresaContextProvider>
        </ColaboradorContextProvider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
