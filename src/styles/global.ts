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
}.modal-overlay {
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

`;
