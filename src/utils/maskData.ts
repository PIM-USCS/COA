const maskData = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  let valorFormatado = value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (valorFormatado.length <= 2) {
    valorFormatado = `${valorFormatado}`;
  } else if (valorFormatado.length <= 4) {
    valorFormatado = `${valorFormatado.slice(0, 2)}/${valorFormatado.slice(2)}`;
  } else {
    valorFormatado = `${valorFormatado.slice(0, 2)}/${valorFormatado.slice(
      2,
      4
    )}/${valorFormatado.slice(4, 8)}`;
  }

  return {
    name,
    valorFormatado,
  };
};

export default maskData;
