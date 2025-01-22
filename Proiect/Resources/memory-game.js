const gameBoard = document.getElementById("game-board");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let cards = [];
let flippedCards = [];
let matches = 0;
let timer;
let time = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const players = [
    { "name": "Marc-André ter Stegen", "photo": "Resources/Photos/ter_stegen.png" },
    { "name": "Robert Lewandowski", "photo": "Resources/Photos/robert-lewandowski.png" },
    { "name": "Pedri", "photo": "Resources/Photos/pedri.png" },
    { "name": "Gavi", "photo": "Resources/Photos/gavi.png" },
    { "name": "Frenkie de Jong", "photo": "Resources/Photos/frenkie-de-jong.png" },
    { "name": "Ronald Araújo", "photo": "Resources/Photos/ronald-araujo.png" }
];

function initializeGame() {
    gameBoard.innerHTML = "";
    matches = 0;
    time = 0;
    flippedCards = [];
    timerElement.textContent = "0";

    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        timerElement.textContent = time;
    }, 1000);

    cards = shuffle([...players, ...players]);
    createCards();
}

function createCards() {
    cards.forEach(player => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.name = player.name;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">
                    <img src="${player.photo}" alt="${player.name}">
                </div>
            </div>
        `;

        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(e) {
    const clickedCard = e.currentTarget;

    if (clickedCard.classList.contains("flipped") || flippedCards.length === 2) {
        return;
    }

    clickedCard.classList.add("flipped");
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.name === secondCard.dataset.name) {
        matches++;
        flippedCards = [];

        if (matches === cards.length / 2) {
            clearInterval(timer);
            alert(`You win! Time: ${time}s`);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener("click", initializeGame);

initializeGame();

function randomizeCardColors() {
    const cards = document.querySelectorAll(".card-front");
    const colors = ["#A50044", "#004D98"];
    cards.forEach(card => {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        card.style.backgroundColor = randomColor;
    });
}
setInterval(randomizeCardColors, 3000);

