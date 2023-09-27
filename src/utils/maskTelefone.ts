const maskTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  let valorFormatado = value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (valorFormatado.length <= 2) {
    valorFormatado = `(${valorFormatado}`;
  } else if (valorFormatado.length <= 7) {
    valorFormatado = `(${valorFormatado.slice(0, 2)}) ${valorFormatado.slice(
      2
    )}`;
  } else {
    valorFormatado = `(${valorFormatado.slice(0, 2)}) ${valorFormatado.slice(
      2,
      7
    )}-${valorFormatado.slice(7, 11)}`;
  }

  return {
    name,
    valorFormatado,
  };
};

export default maskTelefone;
