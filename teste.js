const splitNumberIntoClasses = (inputNumber) => {
  const chunks = [];
  const reversedNumber = inputNumber.split('').reverse().join('');
  for (let i = 0; i < reversedNumber.length; i += 3) {
    const chunk = reversedNumber.slice(i, i + 3);
    chunks.push(chunk.split('').reverse().join(''));
  }
  return chunks.reverse();
};

function splitStringBy3FromEnd(string) {
  const chunks = [];
  for (let i = string.length - 1; i >= 0; i -= 3) {
    const start = Math.max(i - 2, 0);
    const end = i + 1;
    chunks.push(string.slice(start, end));
  }
  return chunks.reverse();
}

const splitNumberIntoClasses2 = (inputNumber) => {
  const chunks = inputNumber
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g);

  return chunks.map((chunk) => chunk.split('').reverse().join('')).reverse();
};

const splitNumberIntoClasses3 = (inputNumber) => {
  return inputNumber
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .map((chunk) => chunk.split('').reverse().join(''))
    .reverse();
};

const splitNumberIntoClasses5 = (inputNumber) => {
  // return inputNumber.match(/.{1,3}(?=(.{3})*$)/g)?.map((chunk) => chunk);
  return inputNumber.match(/.{1,3}(?=(.{3})*$)/g);
};

const numTeste = 'abcdefg';

const splitedNumber3 = splitNumberIntoClasses3(numTeste);
const splitedNumber5 = splitNumberIntoClasses5(numTeste);
console.log('splitNumberIntoClasses3:', splitedNumber3);
console.log('splitNumberIntoClasses5:', splitedNumber5);
