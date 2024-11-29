document.addEventListener("DOMContentLoaded", () => {
    const symbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝', '🍑',
                     '🥭', '🍋', '🍏', '🍐', '🥥', '🥕', '🌽', '🍅', '🍆', 
                     '🌶️', '🥒', '🫑', '🧄', '🧅', '🥔', '🍠', '🌰', '🍯', 
                     '🍄', '🥬', '🥗', '🧀', '🍳']; // 32 unique symbols
    let tiles = [];
    let firstTile = null;
    let secondTile = null;
    let matches = 0;
    const totalPairs = symbols.length;

    const gameContainer = document.getElementById('gameContainer');
    const messageDisplay = document.getElementById('message');

    // Initialize the game
    function initializeGame() {
        tiles = [...symbols, ...symbols].sort(() => Math.random() - 0.5); // Duplicate and shuffle symbols
        matches = 0;
        firstTile = null;
        secondTile = null;

        renderTiles();
        messageDisplay.textContent = 'Find all the matching pairs!';
    }

    // Render the tiles
    function renderTiles() {
        gameContainer.innerHTML = '';
        tiles.forEach((symbol, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.symbol = symbol;
            tile.dataset.index = index;

            tile.addEventListener('click', () => handleTileClick(tile));
            gameContainer.appendChild(tile);
        });
    }

    // Handle tile click
    function handleTileClick(tile) {
        if (tile.classList.contains('revealed') || tile.classList.contains('matched') || secondTile) {
            return; // Ignore clicks on revealed or matched tiles
        }

        revealTile(tile);

        if (!firstTile) {
            firstTile = tile; // Set the first tile
        } else {
            secondTile = tile; // Set the second tile
            checkMatch(firstTile, secondTile);
        }
    }

    // Reveal a tile
    function revealTile(tile) {
        tile.classList.add('revealed');
        tile.textContent = tile.dataset.symbol;
    }

    // Hide a tile
    function hideTile(tile) {
        tile.classList.remove('revealed');
        tile.textContent = '';
    }

    // Check for a match
    function checkMatch(tile1, tile2) {
        if (tile1.dataset.symbol === tile2.dataset.symbol) {
            handleMatch(tile1, tile2);
        } else {
            setTimeout(() => {
                hideTile(tile1);
                hideTile(tile2);
                firstTile = null;
                secondTile = null;
            }, 1000);
        }
    }

    // Handle a match
    function handleMatch(tile1, tile2) {
        tile1.classList.add('matched');
        tile2.classList.add('matched');
        matches++;
        firstTile = null;
        secondTile = null;
        checkWin();
    }

    // Check for win condition
    function checkWin() {
        if (matches === totalPairs) {
            messageDisplay.textContent = 'Congratulations! You found all the pairs!';
            setTimeout(() => {
                initializeGame(); // Restart the game
            }, 2000);
        }
    }

    // Start the game
    initializeGame();
});
