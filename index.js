const firstNames = ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Evelyn', 'Abigail', 'Harper', 'Emily', 'Elizabeth', 'Sofia', 'Madison', 'Avery', 'Ella', 'Scarlett', 'Grace', 'Chloe'];

const getRandomChips = () => Math.floor(Math.random() * 900) + 100;

const getRandomFirstName = () => firstNames[Math.floor(Math.random() * firstNames.length)];

const player = {
    name: getRandomFirstName(),
    chips: getRandomChips(),
};

let sum;
let cards;
let isAlive = false;
let haveBlackJack = false;

const getRandomCardValue = () => {
    const value = Math.floor(Math.random() * 13) + 1;
    return value >= 10 ? 10 : value;
};

const renderMessage = () => {
    const textMessage = document.querySelector("#message-el");
    if (sum > 21) {
        isAlive = false;
        haveBlackJack = false;
        textMessage.textContent = "You're out of the game!";
        player.chips = 0;
    } else if (sum === 21) {
        isAlive = true;
        haveBlackJack = true;
        textMessage.textContent = "You've got Blackjack!";
        player.chips *= 2;
    } else {
        isAlive = true;
        haveBlackJack = false;
        textMessage.textContent = "Do you want to draw a new card?";
    }
};

const renderCards = () => document.querySelector("#cards-el").textContent = "Cards: " + cards.join(" ");

const renderSum = () => document.querySelector("#sum-el").textContent = "Sum: " + sum;

const updateUI = () => {
    renderMessage();
    renderCards();
    renderSum();
    document.querySelector("#player-el").textContent = player.name + ": " + player.chips + "$";
};

const setUp = () => {
    player.name = getRandomFirstName();
    player.chips = getRandomChips();
    cards = [getRandomCardValue(), getRandomCardValue()];
    sum = cards.reduce((total, card) => total + card, 0);
    if (sum === 11) sum = 21;
};

function startGame() {
    setUp();
    updateUI();
}

function newCard() {
    if (isAlive && !haveBlackJack) {
        const moreCard = getRandomCardValue();
        sum += moreCard;
        cards.push(moreCard);
        updateUI();
    }
}
