// funkce k zjištění výhry
import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

// proměnná, kdo je na tahu (kolečko začíná)
let currentPlayer = 'circle';

// prvek pro zobrazení symbolu hráče
const playerSymbol = document.querySelector('.symbol');

// všechna políčka hrací plochy
const fields = document.querySelectorAll('.square');

// získání aktuálního stavu hrací plochy
const getBoardState = () => {
  return Array.from(fields).map((field) => {
    if (field.classList.contains('board__field--cross')) {
      return 'x';
    } else if (field.classList.contains('board__field--circle')) {
      return 'o';
    } else {
      return '_';
    }
  });
};

// funkce, která požádá API o tah za AI a klikne na příslušné políčko
const aiMove = async () => {
  const board = getBoardState();

  const response = await fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      board: board,
      player: 'x',
    }),
  });

  const data = await response.json();
  const { x, y } = data.position;
  const index = x + y * 10;
  fields[index].click(); // simululace kliknutí na políčko
};

// funkce, která se volá při kliknutí na jakékoliv políčko
const handleFieldClick = async (event) => {
  const clickedField = event.target;

  // pokud je políčko už obsazené, nic nedělej
  if (
    clickedField.classList.contains('board__field--circle') ||
    clickedField.classList.contains('board__field--cross')
  ) {
    return;
  }

  // přidej správnou třídu podle hráče a změň zobrazený symbol
  if (currentPlayer === 'circle') {
    clickedField.classList.add('board__field--circle');
    playerSymbol.src = 'cross.svg';
    currentPlayer = 'cross';
  } else {
    clickedField.classList.add('board__field--cross');
    playerSymbol.src = 'circle.svg';
    currentPlayer = 'circle';
  }

  clickedField.disabled = true;

  // zkontroluj výherce
  const board = getBoardState();
  const winner = findWinner(board);

  if (winner === 'x' || winner === 'o') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner === 'x' ? 'křížek' : 'kolečko'}!`);
      location.reload(); // 🔁 nová hra
    }, 100);
    return;
  }

  // pokud je na tahu křížek – zahraje AI
  if (currentPlayer === 'cross') {
    await aiMove();
  }
};

// přidání posluchače na každé políčko
fields.forEach((field) => {
  field.addEventListener('click', handleFieldClick);
});

// restart tlačítko – zeptá se, jestli chce hráč začít znovu
const restartButton = document.querySelector('.icon-button.blue');
restartButton.addEventListener('click', (event) => {
  const confirmRestart = confirm('Opravdu chcete začít znovu?');
  if (!confirmRestart) {
    event.preventDefault(); // zruší reload
  }
});
