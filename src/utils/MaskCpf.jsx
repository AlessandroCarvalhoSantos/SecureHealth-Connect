function MaskCpf(value) {
    value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos, novamente (para o segundo bloco de números)
    value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
    value = value.replace(/(-\d{2})\d+?$/, '$1'); // Captura apenas 2 dígitos após o hífen
  return value;
}
  
export default MaskCpf;
