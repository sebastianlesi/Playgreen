export const REGEXP = {
  ONLY_LETTERS: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
  ONE_UPPER_LETTER: /^(?=.*?[A-Z])/, 
  ONE_LOWER_LETTER: /(?=.*?[a-z])/,
  ONE_NUMBER: /(?=.*?\d)/,
  ONE_SPECIAL_CHAR: /(?=.*?[#?!@$%^&*-])/,
};
