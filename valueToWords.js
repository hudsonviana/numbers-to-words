const unitsAndTens = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
const units = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const tens = ['dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const hundreds = ['cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

const getWords = (value, arr) => {
  return arr[parseInt(value - 1)];
};

// const splitNumber = (inputNumber) => {
//   const numberString = String(inputNumber);
//   const chunks = [];
//   for (let i = 0; i < numberString.length; i += 3) {
//     chunks.push(numberString.slice(i, i + 3));
//   }
//   return chunks;
// };

const splitNumber = (inputNumber) => {
  // Converte o número para uma string
  const numberString = inputNumber.toString();

  // Inicializa um array para armazenar os chunks de dígitos
  const chunks = [];

  // Inverte a string para facilitar a iteração da direita para a esquerda
  const reverseNumber = numberString.split('').reverse().join('');

  // Divide a string em chunks de 3 dígitos
  for (let i = 0; i < reverseNumber.length; i += 3) {
    const group = reverseNumber.slice(i, i + 3);
    chunks.push(group.split('').reverse().join(''));
  }

  // Inverte novamente para obter a ordem correta
  const result = chunks.reverse();

  return result;
};

const valueToWords = (inputValue) => {
  const result = [];
  const stringValue = String(inputValue);
  const parts = stringValue.split('.');
  const integerValue = parts[0];
  const decimalValue = parts[1]?.length === 1 ? String(parts[1] * 10) : parts[1] || '00';

  const convertToWords = (charArray) => {
    if (charArray.length === 3) {
      if (parseInt(charArray.join('')) === 100) {
        result.push('cem');
      } else {
        result.push(getWords(charArray[0], hundreds));
        charArray.shift();
        if (parseInt(charArray.join('')) <= 19) {
          result.push(getWords(charArray.join(''), unitsAndTens));
        } else {
          result.push(getWords(charArray[0], tens));
          charArray.shift();
          result.push(getWords(charArray[0], units));
        }
      }
    } else if (charArray.length === 2) {
      if (parseInt(charArray.join('')) <= 19) {
        result.push(getWords(charArray.join(''), unitsAndTens));
      } else {
        result.push(getWords(charArray[0], tens));
        charArray.shift();
        result.push(getWords(charArray[0], units));
      }
    } else if (charArray.length === 1) {
      result.push(getWords(charArray[0], units));
    }
  };

  const teste = splitNumber(integerValue);
  console.log(teste);

  const charIntegerArray = [...integerValue];

  const charDecimalArray = [...decimalValue];

  convertToWords(charIntegerArray);

  return result.filter((res) => res);
};

const inputValue = 65941.08;
console.log(valueToWords(inputValue));
