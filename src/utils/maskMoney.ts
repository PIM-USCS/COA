const maskMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  let valorFormatado = value.replace(/\D/g, ""); // Remove caracteres não numéricos

  const valorEmCentavos = parseInt(valorFormatado, 10);

  if (!isNaN(valorEmCentavos)) {
    valorFormatado = (valorEmCentavos / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return {
    name,
    valorFormatado,
  };
};

export default maskMoney;
