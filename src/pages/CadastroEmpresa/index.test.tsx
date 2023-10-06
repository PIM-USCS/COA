import { render, screen, fireEvent } from "@testing-library/react";
import { CadastroCliente } from ".";

jest.mock("react-router-dom");
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("Testa o cadastro da empresa", () => {
  it("cadastra ie da empresa", () => {
    render(<CadastroCliente />);
    const colaboradorInput = screen.getByPlaceholderText(
      /Inscrição Estadual/i
    ) as HTMLInputElement;
    fireEvent.change(colaboradorInput, {
      target: { value: "283.293.712.617" },
    });
    expect(colaboradorInput.value).toBe("283.293.712.617");
  });
  it("cadastra razao social da empresa", () => {
    render(<CadastroCliente />);
    const colaboradorInput = screen.getByPlaceholderText(
      /Razão social/i
    ) as HTMLInputElement;
    fireEvent.change(colaboradorInput, {
      target: { value: "Patrícia e Gael Pizzaria ME" },
    });
    expect(colaboradorInput.value).toBe("Patrícia e Gael Pizzaria ME");
  });
  it("cadastra numero do endereço da empresa", () => {
    render(<CadastroCliente />);
    const colaboradorInput = screen.getByPlaceholderText(
      /Numero/i
    ) as HTMLInputElement;
    fireEvent.change(colaboradorInput, {
      target: { value: "123" },
    });
    expect(colaboradorInput.value).toBe("123");
  });
  it("cadastra complemento do endereço da empresa", () => {
    render(<CadastroCliente />);
    const colaboradorInput = screen.getByPlaceholderText(
      /Complemento/i
    ) as HTMLInputElement;
    fireEvent.change(colaboradorInput, {
      target: { value: "123" },
    });
    expect(colaboradorInput.value).toBe("123");
  });
});

describe("Testa o cadastro do cliente", () => {
  it("cadastra cpf do cliente", () => {
    render(<CadastroCliente />);
    const colaboradorInput = screen.getByPlaceholderText(
      /CPF CLIENTE/i
    ) as HTMLInputElement;
    fireEvent.change(colaboradorInput, {
      target: { value: "93585325645" },
    });
    expect(colaboradorInput.value).toBe("935.853.256-45");
  });
});
