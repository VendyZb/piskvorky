// načte se funkce findWinner z externí knihovny
// tím se zjistí, jestli někdo vyhrál
import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

// nastavím, že jako první hraje kolečko
let currentPlayer = 'circle';

// najde se HTML element obrázku vedle textu HRAJE:

const playerSymbol = document.querySelector('.symbol');

// funkce, která vrátí pole se stavem celé hry
// obsahuje těch 100 položek: 'x', 'o' nebo '_' podle políček
const getBoard = () => {
  const fields = document.querySelectorAll('.square');
  const board = [];

  fields.forEach((field) => {
    if (field.classList.contains('board__field--cross')) {
      board.push('x');
    } else if (field.classList.contains('board__field--circle')) {
      board.push('o');
    } else {
      board.push('_');
    }
  });

  return board;
};

// funkce, která se spustí při kliknutí na jedno políčko

const handleFieldClick = (event) => {
  const clickedField = event.target;

   // pokud už je políčko obsazené = nelze do něj hrát
  if (
    clickedField.classList.contains('board__field--circle') ||
    clickedField.classList.contains('board__field--cross')
  ) {
    return;
  }

   //  podle toho, kdo je na tahu = změní se ikonka
  if (currentPlayer === 'circle') {
    clickedField.classList.add('board__field--circle');
    playerSymbol.src = 'cross.svg';
    currentPlayer = 'cross';
  } else {
    clickedField.classList.add('board__field--cross');
    playerSymbol.src = 'circle.svg';
    currentPlayer = 'circle';
  }

   // žádné další klikání na stejné políčko
  clickedField.disabled = true;


  // zjistím stav celé hry (100 políček) => jestli někdo vyhrál
  const board = getBoard();
  const winner = findWinner(board);

  console.log(board);
  console.log(board.length);
  console.log('Vítěz:', winner);


  // někdo vyhrál => ukáže se hláška a načte se hra znovu
  if (winner === 'x' || winner === 'o') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner === 'x' ? 'křížek' : 'kolečko'}!`);
      location.reload();
    }, 100);
  }
};

// připojit posluchače až po správné funkce
const allFields = document.querySelectorAll('.square');
allFields.forEach((field) => {
  field.addEventListener('click', handleFieldClick);
});

// dotaz na potvrzení RESTART
const restartButton = document.querySelector('.icon-button.blue');
restartButton.addEventListener('click', (event) => {
  const reset = confirm('Opravdu chcete hru restartovat?');
  if (!reset) {
    event.preventDefault();
  }
});

