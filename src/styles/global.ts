import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
margin:0;   
padding:0;
box-sizing: border-box;
}

:root {
  --primary: #028a0f;
  --secondary: #191c24;
  --light: #6c7293;
  --dark: #000000;
}
body{
     background: ${(props) => props.theme.background}; 
}


body, input, textarea, button
{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    
}

/* LOADING COMPONENTE */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #fff;
  padding: 40px; 
  width: 300px ;
  border-radius: 8px;
  text-align: center;
}

.loading-icon {
  border: 6px solid rgba(0, 0, 0, 0.3);
  border-top: 6px solid #028a0f;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.loading-text {
  font-size: 18px;
  margin-top: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}




/* HEADER COMPONENTE */

.tela-home-div-header {
  display: flex;
  justify-content: space-between;
}
.tela-home-div-header-direita {
  align-items: center;
  width: 550px;
  display: flex;
  justify-content: center;
}

.tela-home-div-header-home img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: transparent;
}

.tela-home-submenu-usuario {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--secondary);
  margin-top: 160px;
}
.tela-home-submenu-usuario button {
  background-color: transparent;
  border: none;
  padding: 10px;
  font-size: 16px;
  color: var(--light);
  cursor: pointer;
  display: flex;
  gap: 4px;
}
.tela-home-submenu-usuario button:hover {
  color: var(--primary);
}

.tela-home-botao-dashboard,
.tela-home-botao-pages {
  background-color: transparent;
  border: none;
  margin: 10px 0;
  color: black;
  font-size: 16px;
  color: var(--light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  cursor: pointer;
}

.tela-home-botao-usuario img {
  width: 60px;
  height: 60px;
  border-radius: 99px;
}



/* STYLES DA TABLE */


.main-principal {
  font-family: Arial, sans-serif;
  background-color: var(--dark);
  display: flex;
flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  overflow-x: auto;
  margin: 0;
  min-height: 100vh;
  overflow-x: auto;
}

table {
  width: 80%; /* Alterado para 80% */
  height: 30%;
  margin: 20px 0;
  padding: 15px;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: var(--secondary);
  color: white;
}

table th,
table td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid var(--dark);
}

table th {
  background-color: var(--light); /* Alterado para a cor azul escura */
}

table tr:nth-child(even) {
  background-color: var(--dark);
}

table tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
}


.botao-table-edit,
.botao-table-delete,
.botao-table-view {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 10px;
  font-size: 18px;
}

.botao-table-edit:hover,
.botao-table-delete:hover,
.botao-table-view:hover {
  background-color: var(--dark);
}

table tr:hover {
  background-color: var(--light); /* Alterado para a cor escura */
}


`;
