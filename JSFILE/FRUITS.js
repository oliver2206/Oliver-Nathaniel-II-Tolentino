// Array of symbols to be used for the tiles
const symbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝', '🍑', 
    '🥭', '🍋', '🍏', '🍐', '🥥', '🥕', '🌽', '🍅', '🍆'];

// Variables to hold the state of the game
let tiles, gameContainer, firstTile = null, secondTile = null, matches = 0, gameStarted = false, totalPairs;

// Function to initialize the game (either load saved progress or start a new game)
function initializeGame() {
const savedState = localStorage.getItem('tileFlipGameState');
if (savedState) {
loadGameProgress(); // Load saved progress
} else {
startNewGame(); // Start a new game
}
addFruits(); // Add bouncing fruits behind the tiles
}

// Function to start a new game by resetting variables and generating new tiles
function startNewGame() {
matches = 0;
gameStarted = true;
const selectedSymbols = symbols.sort(() => 0.5 - Math.random()).slice(0, 9); // Pick a random subset of symbols
tiles = [...selectedSymbols, ...selectedSymbols].sort(() => 0.5 - Math.random()); // Create pairs and shuffle
totalPairs = selectedSymbols.length;
renderTiles(); // Render the tiles on the page
}

// Function to render the tiles on the game board
function renderTiles() {
gameContainer = document.getElementById('gameContainer');
gameContainer.innerHTML = ''; // Clear the container
tiles.forEach((symbol, index) => {
const tile = createTile(symbol, index); // Create each tile
gameContainer.appendChild(tile); // Add tile to the container
});
}

// Function to create a single tile element
function createTile(symbol, index) {
const tile = document.createElement('div');
tile.classList.add('tile');
tile.dataset.symbol = symbol; // Store the symbol as a dataset attribute
tile.dataset.index = index; // Store the index as a dataset attribute
tile.addEventListener('click', () => handleTileClick(tile)); // Add click event listener
return tile;
}

// Function to handle the logic when a tile is clicked
function handleTileClick(tile) {
if (!gameStarted || tile.classList.contains('revealed') || tile.classList.contains('matched') || secondTile) {
return;
}

tile.classList.add('revealed');
tile.textContent = tile.dataset.symbol;

if (!firstTile) {
firstTile = tile;
} else {
secondTile = tile;
if (firstTile.dataset.symbol === secondTile.dataset.symbol) {
firstTile.classList.add('matched');
secondTile.classList.add('matched');
firstTile = null;
secondTile = null;
matches++;
checkWin();
} else {
setTimeout(() => {
   firstTile.classList.remove('revealed');
   firstTile.textContent = '';
   secondTile.classList.remove('revealed');
   secondTile.textContent = '';
   firstTile = null;
   secondTile = null;
}, 1000);
}
}
saveGameProgress();
}

// Function to check if the player has won the game
function checkWin() {
if (matches === totalPairs) {
setTimeout(() => {
alert('Congratulations! You won!');
startNewGame();
}, 500);
}
}

// Function to save the current game state to localStorage
function saveGameProgress() {
const gameState = {
tiles: tiles,
matches: matches,
gameStarted: gameStarted,
totalPairs: totalPairs
};
localStorage.setItem('tileFlipGameState', JSON.stringify(gameState));
}

// Function to load the game state from localStorage
function loadGameProgress() {
const savedState = JSON.parse(localStorage.getItem('tileFlipGameState'));
tiles = savedState.tiles;
matches = savedState.matches;
gameStarted = savedState.gameStarted;
totalPairs = savedState.totalPairs;
renderTiles();
}

// Initialize the game when the page loads
window.onload = initializeGame;
