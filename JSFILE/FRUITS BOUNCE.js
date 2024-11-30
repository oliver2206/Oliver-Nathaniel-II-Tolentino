// Add fruit elements that will bounce behind the tiles with customized sizes and random bounce paths
function addFruits() {
    const fruits = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝', '🍑', 
                    '🥭', '🍋', '🍏', '🍐', '🥥', '🥕', '🌽', '🍅', '🍆'];

    const fruitSizes = {
        '🍎': '6rem',  // Apple
        '🍌': '3rem',  // Banana
        '🍇': '2.5rem',  // Grapes
        '🍉': '3.5rem',  // Watermelon
        '🍒': '2rem',  // Cherry
        '🍓': '2rem',  // Strawberry
        '🍍': '4rem',  // Pineapple
        '🥝': '2.5rem',  // Kiwi
        '🍑': '3rem',  // Peach
        '🥭': '4rem',  // Mango
        '🍋': '2rem',  // Lemon
        '🍏': '3rem',  // Green Apple
        '🍐': '3rem',  // Pear
        '🥥': '3rem',  // Coconut
        '🥕': '2rem',  // Carrot
        '🌽': '3rem',  // Corn
        '🍅': '3rem',  // Tomato
        '🍆': '3rem'   // Eggplant
    };

    fruits.forEach(fruit => {
        const fruitElement = document.createElement('div');
        fruitElement.classList.add('fruit');
        fruitElement.textContent = fruit;
        fruitElement.style.fontSize = fruitSizes[fruit];

        // Generate random values for bounce locations
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        const bounceEndX = Math.random() * 100;
        const bounceEndY = Math.random() * 100;
        const bounceStartX = Math.random() * 100;
        const bounceStartY = Math.random() * 100;

        // Set custom properties for dynamic bounce paths
        fruitElement.style.setProperty('--start-x', `${startX}%`);
        fruitElement.style.setProperty('--start-y', `${startY}%`);
        fruitElement.style.setProperty('--end-x', `${endX}%`);
        fruitElement.style.setProperty('--end-y', `${endY}%`);
        fruitElement.style.setProperty('--bounce-end-x', `${bounceEndX}%`);
        fruitElement.style.setProperty('--bounce-end-y', `${bounceEndY}%`);
        fruitElement.style.setProperty('--bounce-start-x', `${bounceStartX}%`);
        fruitElement.style.setProperty('--bounce-start-y', `${bounceStartY}%`);

        gameContainer.appendChild(fruitElement);
    });
}

// Function to handle fruit bouncing animation
document.addEventListener('DOMContentLoaded', function () {
    addFruits(); // Call the function after the DOM is fully loaded
});
