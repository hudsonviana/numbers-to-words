const getValueInFull = (inputValue) => {
  if (inputValue > 999999999999999) {
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

  const insertCharacterBetweenWords = (words, character) => {
    return words.flatMap((word, index) => (index < words.length - 1 ? [word, character] : [word]));
  };

  const getWords = (value, arr) => {
    const indexDeducted = arr === teens ? 11 : 1;
    return arr[value - indexDeducted];
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
      if (lastTwoDigits > 0 && lastTwoDigits < 10) {
        words.push(getWords(lastDigit, units));
      } else if (lastTwoDigits == 10) {
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

  // Convert Integer part to words

  if (integerValue > 0) {
    const splitNumberIntoClasses = (inputNumber) => {
      const numberString = String(inputNumber);
      const chunks = [];
      const reversedNumber = numberString.split('').reverse().join('');
      for (let i = 0; i < reversedNumber.length; i += 3) {
        const group = reversedNumber.slice(i, i + 3);
        chunks.push(group.split('').reverse().join(''));
      }
      return chunks.reverse();
    };

    const getNumberClassName = (value, orderClass) => {
      const classes = {
        2: 'mil',
        3: value == 1 ? 'milhão' : 'milhões',
        4: value == 1 ? 'bilhão' : 'bilhões',
        5: value == 1 ? 'trilhão' : 'trilhões',
      };
      return value != 0 ? classes[orderClass] : null;
    };

    const insertSeparatorsAfterWords = (numberClassName, integerRemainder) => {
      console.log('valor restante:', integerRemainder);
      if (numberClassName && ((numberClassName === 'mil' && integerRemainder > 100) || (numberClassName !== 'mil' && integerRemainder != 0))) {
        result.push(',');
      } else if (numberClassName && numberClassName !== 'mil' && integerRemainder == 0) {
        result.push('de');
      } else if (numberClassName === 'mil' && integerRemainder != 0) {
        result.push('e');
      }
    };

    const integerSplitIntoClasses = splitNumberIntoClasses(integerValue);
    let orderClass = integerSplitIntoClasses.length;

    for (let i = 0; i < integerSplitIntoClasses.length; i++) {
      const charIntegerArray = [...integerSplitIntoClasses[i]];
      const wordsIntegerArray = convertNumberToWords(charIntegerArray);
      result.push(...wordsIntegerArray);

      const numberClassName = getNumberClassName(integerSplitIntoClasses[i], orderClass);
      result.push(numberClassName);
      orderClass--;

      const integerRemainder = integerSplitIntoClasses.filter((classInteger, index, arr) => arr.indexOf(classInteger) > i).join(''); // dá erro quando os valores de classInteger são todos iguais. Ex: 111.111 ou 324.324 ou 999.999

      insertSeparatorsAfterWords(numberClassName, integerRemainder);
    }

    result.push(currencyName);
  }

  // Convert Decimal part to words

  if (parseInt(decimalValue) > 0) {
    if (integerValue > 0) result.push('e');
    const charDecimalArray = [...decimalValue];
    const wordsDecimalArray = convertNumberToWords(charDecimalArray);
    result.push(...wordsDecimalArray);

    result.push(fractionName);
  }

  const resultSanitized = result.filter((res) => res);
  const valueInFull = resultSanitized
    .map((word) => (word === ',' ? ',' : ` ${word}`))
    .join('')
    .trim();

  return valueInFull;
};
// 999999999999999
const inputValue = 112112;
console.log(getValueInFull(inputValue));
