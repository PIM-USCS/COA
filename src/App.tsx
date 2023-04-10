import { ColaboradorContextProvider } from "./Context/ColaboradorContext";
import { EmpresaContextProvider } from "./Context/EmpresaContext";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <ColaboradorContextProvider>
        <EmpresaContextProvider>
          <Router />
        </EmpresaContextProvider>
      </ColaboradorContextProvider>
    </BrowserRouter>
  );
}

export default App;
