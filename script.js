const cards = document.querySelectorAll('.memory-card');
const result = document.querySelector('.result');
const textResult = document.querySelector('.text-result');
const textMove = document.querySelector('.text-move');
const darkScreen = document.querySelector('.dark-screen');
const buttonResult = document.querySelector('.button-result');
const gameResults = document.querySelector('.last-game');
const lastGame = document.querySelector('.last-game');

let nameUser;
let arrResults;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;

textMove.innerHTML = `Количество шагов ${counter}`;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        counter++;
        textMove.innerHTML = `Количество шагов ${counter}`;

        return;
    }
    
    secondCard = this;

    checkForMatch();

    showResult();
      
}

function showResult() {
    let arr = [];
    cards.forEach(item => arr.push(item.classList.contains('flip')));

        if(arr.every(item => item)) {
            setTimeout(() => {
                if (localStorage.getItem('Results')) {
                    arrResults = JSON.parse(localStorage.getItem('Results'));
                } else {
                    arrResults = [];
                }

                if(arrResults.length === 10) {
                    arrResults.shift();
                }

                arrResults.push(`${counter} шагов`);

                localStorage.setItem('Results', JSON.stringify(arrResults));
                
                textResult.innerHTML = `Это землетрясение? Или ты потрясла мой мир за ${counter} шагов?`;

                arrResults.map(item => {
                    let el = document.createElement('li');
                    el.innerHTML = item;
                    lastGame.append(el);
                });

                darkScreen.style.display = "block";
                result.style.display = "flex";
                // result.style.transform = "translate(5px,0)";
                // result.style.transform = "translate(-5px,0)";
                // result.style.transition = "all 0.5s linear";
                   
            }, 1000);
        }

}

function checkForMatch() {
    let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

    isMatch ? disableCards() : unflipCards();

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 24);
        card.style.order = randomPos;
    });
})();

function turnNewGame() {
    window.location.reload();
}

cards.forEach(card => card.addEventListener('click', flipCard));
buttonResult.addEventListener('click', turnNewGame);



