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
  const currencyName = integerValue == 1 ? 'real' : 'reais';
  const fractionName = decimalValue == 1 ? 'centavo' : 'centavos';

  const getWords = (value, arr) => {
    const indexDeducted = arr === teens ? 11 : 1;
    return arr[value - indexDeducted];
  };

  const insertCharacterBetweenWords = (words, character) => {
    return words.flatMap((word, index) => (index < words.length - 1 ? [word, character] : [word]));
  };

  const convertNumberToWords = (numArray) => {
    const words = [];
    const digits = numArray.length;
    const firstDigit = numArray[0];
    const middleDigit = numArray[1];
    const lastDigit = numArray[digits - 1];
    const lastTwoDigits = numArray.slice(-2).join('');

    if (digits === 3) {
      if (numArray.join('') == 100) {
        words.push('cem');
      } else {
        words.push(getWords(firstDigit, hundreds));
        if (lastTwoDigits > 0 && lastTwoDigits < 10) {
          words.push(getWords(lastDigit, units));
        } else if (lastTwoDigits == 10) {
          words.push(getWords(middleDigit, tens));
        } else if (lastTwoDigits > 10 && lastTwoDigits <= 19) {
          words.push(getWords(lastTwoDigits, teens));
        } else if (lastTwoDigits > 19) {
          words.push(getWords(middleDigit, tens));
          if (lastDigit != 0) {
            words.push(getWords(lastDigit, units));
          }
        }
      }
    }

    if (digits === 2) {
      if (lastTwoDigits == 10) {
        words.push(getWords(firstDigit, tens));
      } else if (lastTwoDigits > 10 && lastTwoDigits <= 19) {
        words.push(getWords(lastTwoDigits, teens));
      } else if (lastTwoDigits > 19) {
        words.push(getWords(firstDigit, tens));
        if (lastDigit != 0) {
          words.push(getWords(lastDigit, units));
        }
      }
    }

    if (digits === 1) {
      words.push(getWords(lastDigit, units));
    }

    const wordsSanitized = words.filter((word) => word);
    const resultWords = insertCharacterBetweenWords(wordsSanitized, 'e');
    return resultWords;
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

    const includeComma = (numberClass, nextInteger) => {
      if (numberClass && ((numberClass === 'mil' && nextInteger > 100) || (numberClass !== 'mil' && nextInteger != 0))) {
        result.push(',');
      } else if (numberClass && numberClass !== 'mil' && nextInteger == 0) {
        result.push('de'); // Erro ao testar com o número 32000064.89;
      } else if (numberClass === 'mil' && nextInteger != 0) {
        result.push('e');
      }
    };

    for (let i = 0; i < integerIntoClasses.length; i++) {
      const charIntegerArray = [...integerIntoClasses[i]];
      const wordsIntegerArray = convertNumberToWords(charIntegerArray);
      result.push(...wordsIntegerArray);

      const numberClass = getNumberClass(integerIntoClasses[i], orderClass);
      result.push(numberClass);
      orderClass--;

      includeComma(numberClass, integerIntoClasses[i + 1]);
    }

    result.push(currencyName);
  }

  // Convert Decimal part to words

  if (parseInt(decimalValue) > 0) {
    if (parseInt(integerValue) > 0) result.push('e');
    const charDecimalArray = [...decimalValue];
    const wordsDecimalArray = convertNumberToWords(charDecimalArray);
    result.push(...wordsDecimalArray);

    result.push(fractionName);
  }

  const resultFiltered = result.filter((res) => res);
  const valueInFull = resultFiltered
    .map((word) => (word === ',' ? ',' : ` ${word}`))
    .join('')
    .trim();

  return valueInFull;
};

const inputValue = 32000064.89;
console.log(valueToWords(inputValue));
