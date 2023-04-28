const criarbotao = (text, id, type) => {
  const button = document.createElement('button');
  button.type = type;
  button.innerText = text;
  button.id = id;
  document.getElementById('header2').appendChild(button);
};
const criarinput = (id, name, min) => {
  const input = document.createElement('input');
  input.min = min;
  input.name = name;
  input.type = 'number';
  input.id = id;
  document.getElementById('header2').appendChild(input);
};
criarbotao('Cores aleatórias', 'button-random-color', 'button');
criarbotao('Limpar', 'clear-board', 'button');
criarinput('board-size', 'numberOfPixels', '1');
criarbotao('Go', 'generate-board', 'submit');

const pixelBoard = document.createElement('div');
pixelBoard.id = 'pixel-board';

const saveBoardSize = (value) => {
  localStorage.setItem('boardSize', JSON.stringify(value));
};

const getBoardSize = () => {
  const getBS = JSON.parse(localStorage.getItem('boardSize'));
  return getBS;
};

// 2º e 3º Criar paleta de cores
const palletOfColors = () => {
  const paleta = document.getElementById('color-palette');
  for (let index = 0; index < 4; index += 1) {
    const divPalletColor = document.createElement('div');
    divPalletColor.classList.add('color');
    paleta.appendChild(divPalletColor);
  }
  const coresIniciais = ['black', 'gray', 'green', 'blue'];
  const palletColors = document.querySelectorAll('.color');
  for (let i = 0; i < palletColors.length; i += 1) {
    palletColors[i].style.backgroundColor = coresIniciais[i];
  }
};
palletOfColors();

// 4 - Adicione um botão para gerar cores aleatórias para a paleta de cores.
function generateColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const finalColor = `rgb(${r}, ${g}, ${b})`;
  return finalColor;
}
const treColors = document.querySelectorAll('.color');
const randomColors = () => {
  for (let i = 0; i < treColors.length; i += 1) {
    if (generateColor() !== 'rgb(255, 255, 255)' && generateColor() !== 'rgb(0, 0, 0)') {
      if (generateColor() !== treColors[i].style.backgroundColor) {
        if (i === 0) {
          treColors[0].style.backgroundColor = 'rgb(0, 0, 0)';
          treColors[0].classList.add('selected');
          treColors[0].id = 'avemaria';
        } else {
          treColors[i].style.backgroundColor = generateColor();
        }
      }
    }
  }
  return treColors;
};

// 5 - Implemente uma função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após recarregar a página.
const colors = document.querySelectorAll('.color');
const salvarCores = () => {
  const saveColors = {};
  for (let i = 0; i < colors.length; i += 1) {
    saveColors[i] = colors[i].style.backgroundColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(saveColors));
  return saveColors;
};
const recuCores = () => {
  const reloadColors = JSON.parse(localStorage.getItem('colorPalette'));
  if (localStorage.getItem('colorPalette') === null) {
    salvarCores();
  } else {
    for (let i = 0; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = reloadColors[i];
    }
  }
};
recuCores();

// 6 e 7 - Adicione à página um quadro contendo 25 pixels.
function genareteBoard(numberOfPixels) {
  for (let index = 0; index < numberOfPixels; index += 1) {
    for (let index2 = 0; index2 < numberOfPixels; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.width = '40px';
      pixel.style.height = '40px';
      pixel.style.backgroundColor = 'white';
      pixelBoard.appendChild(pixel);
    }
  }
  document.body.appendChild(pixelBoard);
  document.getElementById('pixel-board').style.width = `${numberOfPixels * 42}px`;
}
genareteBoard(getBoardSize() || 5);

// 8 e 9 Defina a cor preta como cor inicial da paleta de cores
colors[0].classList.add('selected');
for (const cor of colors) {
  cor.addEventListener('click', (event) => {
    const selected = document.querySelector('.selected');
    if (selected !== null) {
      selected.classList.remove('selected');
    }
    event.target.classList.add('selected');
  });
}

// 10 Crie uma função que permita preencher um pixel do quadro com a cor selecionada na paleta de cores.
const pixelsBoard = document.querySelectorAll('.pixel');
for (const pixels of pixelsBoard) {
  pixels.addEventListener('click', (event) => {
    if (event.target.classList.contains('pixel')) {
      const selected = document.querySelector('.selected');
      event.target.style.backgroundColor = selected.style.backgroundColor;
    }
  });
}

// 11 Crie um botão que retorne a cor do quadro para a cor inicial
const pixelsOfBoard = document.querySelectorAll('.pixel');
const btnLimpar = document.getElementById('clear-board');
const limparQuadro = () => {
  btnLimpar.addEventListener('click', () => {
    for (let index = 0; index < pixelsOfBoard.length; index += 1) {
      pixelsOfBoard[index].style.backgroundColor = 'white';
    }
  });
};
limparQuadro();

// 12 Crie uma função para salvar e recuperar o seu desenho atual no localStorage
const colores = document.querySelectorAll('.pixel');
const salvarTabela = () => {
  const saveColors = {};
  for (const iterator of colores) {
    iterator.addEventListener('click', () => {
      for (let i = 0; i < colores.length; i += 1) {
        saveColors[i] = colores[i].style.backgroundColor;
      }
      localStorage.setItem('pixelBoard', JSON.stringify(saveColors));
    });
  }
  return saveColors;
};
const recuTabela = () => {
  const reloadColors = JSON.parse(localStorage.getItem('pixelBoard'));
  if (localStorage.getItem('pixelBoard') === null) {
    salvarCores();
  } else {
    for (let i = 0; i < colores.length; i += 1) {
      colores[i].style.backgroundColor = reloadColors[i];
    }
  }
};
salvarTabela();
recuTabela();

// Limpar o quadro 2
const pixelsOfBoard2 = document.querySelectorAll('#pixel-board')[0];
const limparQuadro2 = () => {
  localStorage.setItem('pixelBoard', JSON.stringify({}));
  pixelsOfBoard2.innerHTML = '';
};

const botao = document.getElementById('generate-board');
const inputBoardSize = document.getElementById('board-size');

const funcAuxiliar = (x) => {
  genareteBoard(x);
  saveBoardSize(x);
  window.location.reload(true);
};

const btnHandleCLick = () => {
  botao.addEventListener('click', () => {
    if (inputBoardSize.value === '') {
      alert('Board inválido!');
      return;
    }
    if (inputBoardSize.value < 5) {
      limparQuadro2();
      funcAuxiliar(5);
    }
    if (inputBoardSize.value > 50) {
      limparQuadro2();
      funcAuxiliar(50);
    }
    if (inputBoardSize.value >= 5) {
      limparQuadro2();
      funcAuxiliar(inputBoardSize.value);
    }
  });
};
btnHandleCLick();
// 13 e 14 genareteBoard(5)

// Botão para gerar cores
const btn = document.getElementById('button-random-color');
btn.addEventListener('click', () => {
  randomColors();
  salvarCores();
  recuCores();
  salvarTabela();
});

// Mouse
const mouse = document.querySelector('.mouse');
document.addEventListener('mousemove', (e) => {
  mouse.setAttribute('style', `top: ${(e.pageY + 15)}px; left: ${(e.pageX + 8)}px;`);
});

// pegar a cor no mouse
const colorSelectedMouse = document.querySelectorAll('.color');
const mouseColor = document.getElementById('selected');
for (const corm of colorSelectedMouse) {
  corm.addEventListener('click', (event) => {
    mouseColor.style.backgroundColor = event.target.style.backgroundColor;
  });
}
