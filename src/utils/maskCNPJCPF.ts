const formatarDocumento = (input: string): string => {
  const cleaned = ("" + input).replace(/\D/g, "");

  if (cleaned.length <= 11) {
    // Se for um CPF
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
  } else if (cleaned.length <= 14) {
    // Se for um CNPJ
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);

    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
    }
  }

  return cleaned;
};

export default formatarDocumento;
