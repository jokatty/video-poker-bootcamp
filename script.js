// 1 player plays
// start the game with 100 points.
// on "deal" => 5 cards will be dealt.
// player can ask for different cards.
// ranking given based on players hand.

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suits = ['❤️', '♦️', '♣️', '♠️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

let totalPoints = 100;
let resultText = '';

function viewResult() {
  const resultBtn = document.createElement('button');
  resultBtn.innerText = 'Result';
  document.body.appendChild(resultBtn);
  return resultBtn;
}

function playerCardsRankArr(drawnCardsArr) {
  const ranksOnlyArr = [];
  for (let i = 0; i < drawnCardsArr.length; i += 1) {
    const card = drawnCardsArr[i].rank;
    ranksOnlyArr.push(card);
  }
  console.log(`cardRanks: ${ranksOnlyArr}`);
  return ranksOnlyArr;
}

// check for one pair
function checkForPairs(dealtCardsArr) {
  const cardRanks = playerCardsRankArr(dealtCardsArr);
  let matches = 1;
  for (let i = 0; i < cardRanks.length; i += 1) {
    for (let j = i + 1; j < cardRanks.length; j += 1) {
      if (cardRanks[i] === cardRanks[j]) {
        matches += 1;
        console.log(`matches: ${matches}`);
      }
    }
  }
  return matches;
}

// function takes an array of card objects and returns the number of points.
function calcHandScore(cardsArr) {
  let matchedNum = checkForPairs(cardsArr);
  if (matchedNum === 2) {
    totalPoints += 20;
    return `One Pair. Earned 20 points in the round. Total points: ${totalPoints}`;
  }
  if (matchedNum === 3) {
    totalPoints += 40;
    return `Three Of a Kind. Earned 40 points in the round. Total points: ${totalPoints}`;
  }
  if (matchedNum === 1) {
    // const score = 10;
    return `No Match :( . Total points: ${totalPoints}`;
  }
  return 'either no match or something went wrong.';
}

// deals the cards
function gameStarted(cards) {
  const dealtCardsArr = [];
  for (let i = 0; i < 5; i += 1) {
    const dealtCard = cards.pop();
    dealtCardsArr.push(dealtCard);
  }
  return dealtCardsArr;
}
function removeCard(cardId) {
  const selectedCard = document.getElementById(cardId);
  selectedCard.remove();
}

function displayCards(cardsArr) {
  const parentDiv = document.getElementById('display-cards');
  for (let i = 0; i < cardsArr.length; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', i);
    card.innerText = `${cardsArr[i].rank}  ${cardsArr[i].suit}`;
    parentDiv.appendChild(card);

    card.addEventListener('click', () => {
      removeCard(i);
      // get a new card for replacement.
      const newDealtCard = deck.pop();
      cardsArr.splice(i, 1, newDealtCard);

      setTimeout(() => {
        parentDiv.innerHTML = '';
        displayCards(cardsArr);
      }, 3000);
    });
  }
  const finalScore = calcHandScore(cardsArr);
  console.log(`final score: ${finalScore}`);

  resultText = finalScore;

  return cardsArr;
}

// click the button to start the game.
const startBtn = document.createElement('button');
startBtn.innerText = 'Play';
document.body.appendChild(startBtn);
startBtn.addEventListener('click', () => {
  // cards are dealt to the player.
  const fiveDealtcards = gameStarted(deck);
  // diplay the cards to the players.
  displayCards(fiveDealtcards);
});

let result = viewResult();

result.addEventListener('click', () => {
  const resultDiv = document.createElement('p');
  resultDiv.innerText = resultText;
  document.body.appendChild(resultDiv);
});