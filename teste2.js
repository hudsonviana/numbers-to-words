const LESS_THAN_20 = [
  '',
  'Um',
  'Dois',
  'Três',
  'Quatro',
  'Cinco',
  'Seis',
  'Sete',
  'Oito',
  'Nove',
  'Dez',
  'Onze',
  'Doze',
  'Treze',
  'Quatorze',
  'Quinze',
  'Dezesseis',
  'Dezessete',
  'Dezoito',
  'Dezenove',
];
const TENS = ['', 'Dez', 'Vinte', 'Trinta', 'Quarenta', 'Cinquenta', 'Sessenta', 'Setenta', 'Oitenta', 'Noventa'];
const HUNDREDS = ['', 'Cem', 'Duzentos', 'Trezentos', 'Quatrocentos', 'Quinhentos', 'Seiscentos', 'Setecentos', 'Oitocentos', 'Novecentos'];
const THOUSANDS = ['', 'Mil', 'Milhão', 'Bilhão'];
const THOUSANDS_PLURAL = ['', 'Mil', 'Milhões', 'Bilhões'];

let numberToWords = (num) => {
  if (num === 0) {
    return 'Zero';
  }

  let thousandCounter = 0;
  let numberOneCounter = 0;
  let result = '';

  const getThousands = () => {
    num === 1 ? numberOneCounter++ : 0;
    return numberOneCounter === 1 ? THOUSANDS : THOUSANDS_PLURAL;
  };

  while (num > 0) {
    result = `${numToString(num, 1000)}${getThousands()[thousandCounter]} ${result}`;
    num = Math.trunc(num / 1000);
    thousandCounter++;
  }

  return result.trim();
};

let numToString = (num, mod) => {
  numMod = num % mod;
  return numMod === 0
    ? ''
    : numMod < 20
    ? `${LESS_THAN_20[numMod]} `
    : numMod < 100
    ? `${TENS[Math.trunc(numMod / 10)]} ${numToString(numMod, 10)}`
    : numMod === 100
    ? `${HUNDREDS[Math.trunc(numMod / 100)]} ${numToString(numMod, 100)}`
    : numMod > 100 && numMod < 200
    ? `Cento e ${numToString(numMod, 100)}`
    : `${LESS_THAN_20[Math.trunc(numMod / 100)]} ${numToString(numMod, 100)}`;
};

console.log(numberToWords(2000000));
console.log(numberToWords(1125));
