const maskData = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  let valorFormatado = value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (valorFormatado.length <= 2) {
    valorFormatado = `${valorFormatado}`;
  } else if (valorFormatado.length <= 4) {
    valorFormatado = `${valorFormatado.slice(0, 2)}/${valorFormatado.slice(2)}`;
  } else {
    const anoAtual = new Date().getFullYear(); // Obtém o ano atual
    valorFormatado = `${valorFormatado.slice(0, 2)}/${valorFormatado.slice(
      2,
      4
    )}/${anoAtual}`;
  }

  return {
    name,
    valorFormatado,
  };
};

export default maskData;
