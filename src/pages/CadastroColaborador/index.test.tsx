/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CadastroColaborador } from ".";
import Swal from "sweetalert2";

jest.mock("react-router-dom");
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Validaçoes do cadastro", () => {
  it("valida o formato do email corretamente", () => {
    const { getByPlaceholderText } = render(<CadastroColaborador />);

    const emailInput = getByPlaceholderText("E-mail");

    // Teste com email inválido
    fireEvent.change(emailInput, { target: { value: "emailinvalido" } });
    fireEvent.blur(emailInput); // Dispara o evento onBlur

    // Teste com email válido
    fireEvent.change(emailInput, { target: { value: "valido@example.com" } });
    fireEvent.blur(emailInput); // Dispara o evento onBlur
  });

  // it("valida se as senhas coicidem e se existe um tipo de usuario", () => {
  //   const { getByPlaceholderText } = render(<CadastroColaborador />);

  //   const adminRadioButton = screen.getByDisplayValue("1");
  //   const colaboradorRadioButton = screen.getByDisplayValue("2");

  //   expect(adminRadioButton).not.toBeChecked();
  //   expect(colaboradorRadioButton).not.toBeChecked();

  //   const cadastrarBotao = screen.getByText("cadastrar");
  //   fireEvent.click(cadastrarBotao);

  //   expect(Swal.fire).toHaveBeenCalledWith({
  //     icon: "warning",
  //     title: "Selecione o tipo de usuário!",
  //   });

  //   /*Validar senhas */
  //   const senha = getByPlaceholderText("Senha");
  //   const confirmarSenha = getByPlaceholderText("Confirmar senha");

  //   fireEvent.change(senha, { target: { value: "senha1" } });
  //   fireEvent.change(confirmarSenha, { target: { value: "senha2" } });

  //   const botaoCadastrar = screen.getByText("cadastrar");
  //   fireEvent.click(botaoCadastrar);

  //   expect(Swal.fire).toHaveBeenCalledWith({
  //     icon: "warning",
  //     title: "As senhas não coincidem!",
  //   });
  // });
});

describe("Testes cadastrais", () => {
  it("cadastra nome do colaborador", () => {
    render(<CadastroColaborador />);
    const colaboradorInput = screen.getByPlaceholderText(
      /Nome/i
    ) as HTMLInputElement;
    fireEvent.change(colaboradorInput, { target: { value: "João" } });
    expect(colaboradorInput.value).toBe("João");
  });
  it("cadastra o email do colaborador", () => {
    render(<CadastroColaborador />);
    const usuarioEmailInput = screen.getByPlaceholderText(
      /E-mail/i
    ) as HTMLInputElement;
    fireEvent.change(usuarioEmailInput, {
      target: { value: "joao@email.com" },
    });
    expect(usuarioEmailInput.value).toBe("joao@email.com");
  });
  it("cadastra o telefone do colaborador com formatação", () => {
    render(<CadastroColaborador />);
    const colaboradorTelefoneInput = screen.getByPlaceholderText(
      /Telefone/i
    ) as HTMLInputElement;
    fireEvent.change(colaboradorTelefoneInput, {
      target: { value: "11912345678" },
    });
    expect(colaboradorTelefoneInput.value).toBe("(11) 91234-5678");
  });
});
