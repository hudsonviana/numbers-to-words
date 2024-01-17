const unitsAndTens = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
const units = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const tens = ['dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
const hundreds = ['cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

const getWords = (value, arr) => {
  return arr[parseInt(value - 1)];
};

const splitNumberIntoClasses = (inputNumber) => {
  const numberString = String(inputNumber);
  const chunks = [];
  const reverseNumber = numberString.split('').reverse().join('');
  for (let i = 0; i < reverseNumber.length; i += 3) {
    const group = reverseNumber.slice(i, i + 3);
    chunks.push(group.split('').reverse().join(''));
  }
  return chunks.reverse();
};

const valueToWords = (inputValue) => {
  const result = [];
  const stringValue = String(inputValue);
  const parts = stringValue.split('.');
  const integerValue = parts[0];
  const decimalValue = parts[1]?.length === 1 ? String(parts[1] * 10) : parts[1] || '00';
  const currencyName = parseInt(integerValue) === 1 ? 'real' : 'reais';
  const fractionName = parseInt(decimalValue) === 1 ? 'centavo' : 'centavos';

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

  // Convert Integer part to words
  const integerIntoClasses = splitNumberIntoClasses(integerValue);

  for (let i = 0; i < integerIntoClasses.length; i++) {
    const charIntegerArray = [...integerIntoClasses[i]];
    convertToWords(charIntegerArray);
  }

  result.push(currencyName);

  // Convert Decimal part to words
  const decimalIntoClasses = splitNumberIntoClasses(decimalValue);

  for (let i = 0; i < decimalIntoClasses.length; i++) {
    const charDecimalArray = [...decimalIntoClasses[i]];
    convertToWords(charDecimalArray);
  }

  result.push(fractionName);

  return result.filter((res) => res);
};

const inputValue = 100.81;
console.log(valueToWords(inputValue));
