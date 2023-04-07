import { EmpresaContextProvider } from "./Context/EmpresaContext";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <EmpresaContextProvider>
        <Router />
      </EmpresaContextProvider>
    </BrowserRouter>
  );
}

export default App;
