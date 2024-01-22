const XLSX = require('xlsx');
const getValueInFull = require('./getValueInFull');

function gerarNumeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min, 2);
}

const testeValorPorExtenso = async (minimo, maximo = null) => {
  const resultado = [];

  if (!maximo) {
    resultado.push({
      numero: minimo,
      valor: minimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      extenso: getValueInFull(minimo),
    });
  }

  for (let valor = minimo; valor < maximo; valor += gerarNumeroAleatorio(1, 12)) {
    resultado.push({
      numero: valor,
      valor: valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      extenso: getValueInFull(valor),
    });
  }

  // const currentDate = new Date();
  // const dateString = currentDate.toLocaleDateString().replace(/\//g, '');
  // const timeString = currentDate.toLocaleTimeString().replace(/:/g, '');
  // const fileName = `extenso_${dateString}_${timeString}.xlsx`;
  // const filePath = `${__dirname}/${fileName}`;

  // const workbook = XLSX.utils.book_new();
  // const worksheet = XLSX.utils.json_to_sheet(resultado);
  // XLSX.utils.book_append_sheet(workbook, worksheet, 'teste_extenso');

  // try {
  //   await XLSX.writeFile(workbook, filePath);
  // } catch (error) {
  //   console.log('Erro ao tentar salvar o arquivo:', error);
  // }
  console.log(resultado[0]);
};

testeValorPorExtenso(1000007150000);
