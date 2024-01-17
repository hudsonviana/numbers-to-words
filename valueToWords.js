const valueToWords = (inputValue) => {
  if (inputValue >= 999999999999999.99) {
    return 'ERRO. O número fornecido é grande demais para ser convertido por extenso.';
  }

  const units = ['um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const teens = ['onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const tens = ['dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const hundreds = ['cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  const result = [];
  const stringValue = String(inputValue);
  const parts = stringValue.split('.');
  const integerValue = parts[0];
  const decimalValue = parts[1]?.length === 1 ? String(parts[1] * 10) : parts[1] || '00';
  const currencyName = parseInt(integerValue) === 1 ? 'real' : 'reais';
  const fractionName = parseInt(decimalValue) === 1 ? 'centavo' : 'centavos';

  const getWords = (value, arr) => {
    const indexDeducted = arr === teens ? 11 : 1;
    return arr[parseInt(value - indexDeducted)];
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

  const convertToWords = (charArray) => {
    if (charArray.length === 3) {
      if (parseInt(charArray.join('')) === 100) {
        result.push('cem');
      } else {
        result.push(getWords(charArray[0], hundreds));
        charArray.shift();
        if (parseInt(charArray.join('')) > 10 && parseInt(charArray.join('')) <= 19) {
          result.push(getWords(charArray.join(''), teens));
        } else {
          result.push(getWords(charArray[0], tens));
          charArray.shift();
          result.push(getWords(charArray[0], units));
        }
      }
    } else if (charArray.length === 2) {
      if (parseInt(charArray.join('')) > 10 && parseInt(charArray.join('')) <= 19) {
        result.push(getWords(charArray.join(''), teens));
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

  if (parseInt(integerValue) > 0) {
    const integerIntoClasses = splitNumberIntoClasses(integerValue);
    let orderClass = integerIntoClasses.length;

    const getNumberClass = (value, orderClass) => {
      if (value != 0) {
        const classes = {
          2: 'mil',
          3: value == 1 ? 'milhão' : 'milhões',
          4: value == 1 ? 'bilhão' : 'bilhões',
          5: value == 1 ? 'trilhão' : 'trilhões',
        };
        return classes[orderClass] || null;
      }
      return null;
    };

    for (let i = 0; i < integerIntoClasses.length; i++) {
      const charIntegerArray = [...integerIntoClasses[i]];
      convertToWords(charIntegerArray);

      const numberClass = getNumberClass(integerIntoClasses[i], orderClass);
      result.push(numberClass);
      orderClass--;
    }

    result.push(currencyName);
  }

  // Convert Decimal part to words

  if (parseInt(decimalValue) > 0) {
    const charDecimalArray = [...decimalValue];
    convertToWords(charDecimalArray);
    result.push(fractionName);
  }

  return result.filter((res) => res);
};

const inputValue = 99999.9;
console.log(valueToWords(inputValue));
