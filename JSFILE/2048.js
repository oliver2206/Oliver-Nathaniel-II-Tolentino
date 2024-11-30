document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    let squares = [];
    const width = 4;
    let score = 0;

    // Variables to handle swipe detection
    let startX;
    let startY;
    let endX;
    let endY;

    // Create the playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    // Generate a new number
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        } else generate();
    }

    // Move the tiles based on swipe direction
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // Similar moveLeft, moveUp, and moveDown functions go here

    // Function to handle swipe event
    function handleSwipe(e) {
        if (e.type === 'touchstart') {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }

        if (e.type === 'touchend') {
            endX = e.changedTouches[0].screenX;
            endY = e.changedTouches[0].screenY;

            const diffX = endX - startX;
            const diffY = endY - startY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    keyRight(); // Swipe right
                } else {
                    keyLeft(); // Swipe left
                }
            } else {
                if (diffY > 0) {
                    keyDown(); // Swipe down
                } else {
                    keyUp(); // Swipe up
                }
            }
        }
    }

    // Add swipe event listeners
    gridDisplay.addEventListener('touchstart', handleSwipe);
    gridDisplay.addEventListener('touchend', handleSwipe);

    // Key control functions (already existing)
    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    // Check for win and game over logic
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You WIN';
                document.removeEventListener('keyup', control);
                setTimeout(() => clear(), 3000);
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You LOSE';
            document.removeEventListener('keyup', control);
            setTimeout(() => clear(), 3000);
        }
    }

    // Clear timer
    function clear() {
        clearInterval(myTimer);
    }

    // Add colors to tiles
    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192';
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da';
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#ede0c8';
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#f2b179';
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#ffcea4';
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#e8c064';
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e';
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982';
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c';
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff';
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5';
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0';
        }
    }

    addColours();
    var myTimer = setInterval(addColours, 50);

});
