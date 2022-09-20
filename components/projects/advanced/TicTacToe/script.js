// Reference the proper elements
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

// Reference all tiles and convert them to an actual array from a NodeList
const tiles = Array.from(document.querySelectorAll('.tile'));

// Initialize everything we need
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameRunning = true;

const PLAYER_X_WIN = 'Player_X_Wins';
const PLAYER_O_WIN = 'Player_Y_Wins';
const TIE = 'Tie';

/**
 * In each sub array we'll store the indexes of the three position that can win the game.
 * So the [0, 1, 2] will represent a case where the first horizontal line is occupied by a player.
 * We'll use this array to decide whether we have a winner or not.
 */
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Decide wether the user wants to perform a valid action or not.
 * If the inner text of the tile is X or O we return false as the action is invalid, otherwise the tile is empty so the action is valid.
 * @param {*} tile to update
 * @returns
 */
const isValidAction = (tile) => {
  if (tile.innerText === 'X' || tile.innerText === 'O') {
    return false;
  }

  return true;
};

/**
 * Update the element in the board array to be the sign of the current player
 * @param {*} index to update
 */
const updateBoard = (index) => {
  board[index] = currentPlayer;
};

/**
 * This function handles the player change by removing the current class from the display, then determine the new symbpl and set it
 * inside the display and update the class of it.
 */
const changePlayer = () => {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
};

/**
 * This function announces the end game result and remove the hide class which is there on default
 * @param {*} type of the end game
 */
const announce = (type) => {
  switch (type) {
    case PLAYER_X_WIN:
      announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
      break;
    case PLAYER_O_WIN:
      announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
      break;
    case TIE:
      announcer.innerText = 'It was a Tie';
      break;
    default:
      break;
  }

  announcer.classList.remove('hide');
};

/**
 * This function checks the current game state and wether we want to proceed.
 */
const handleResultValidation = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    // No winner yet found
    if (a === '' || b === '' || c === '') {
      continue;
    }

    // The winner was found
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  // Show winner
  if (roundWon) {
    announce(currentPlayer === 'X' ? PLAYER_X_WIN : PLAYER_O_WIN);
    isGameRunning = false;
    return;
  }

  //  No winner could be found if everything was filled out
  if (!board.includes('')) {
    announce(TIE);
  }
};

/**
 * This function will receive a tile and an index as a parameter. This function will be called when the user clicks a tile.
 * First we need to check if it is a valid action or not and we'll also check if the game is active currently or not.
 * If both of them are true, we update the innerText of the tile with the sign of the current player, add the corresponding class and update the board array.
 * Now that everything is updated we have to check whether the game hase ended or not so we call handleResultValidation().
 * Lastly we have to call the changePlayer method to pass the turn to the other player.
 * @param {*} tile the current tile we have
 * @param {*} index the current index of the tile we have
 */
const userAction = (tile, index) => {
  if (isValidAction(tile) && isGameRunning) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
};

// Add event listeners to the elements
tiles.forEach((tile, index) => {
  tile.addEventListener('click', () => userAction(tile, index));
});

/**
 * In this function we set the board to consist of nine empty strings, set the game to active,
 * remove the announcer and change the player back to X (by definition X starts always).
 * The last thing we have to do is to loop through the tiles and set the innerText back to an empty string,
 * and remove any player specific classes from the tiles.
 */
const resetBoard = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameRunning = true;
  announcer.classList.add('hide');

  if (currentPlayer === 'O') {
    changePlayer();
  }

  tiles.forEach((tile) => {
    tile.innerText = '';
    tile.classList.remove('playerX');
    tile.classList.remove('playerO');
  });
};

// Add event listener for the reset button
resetButton.addEventListener('click', resetBoard);
