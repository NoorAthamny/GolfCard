const readlineSync = require("readline-sync");

// Creating Card class that holds the suits the values
// that shoes the card properties
class Card {
  constructor(rank, suit, value) {
    this.rank = rank;
    this.value = value;
    this.suit = suit;
  }
}

// creating deck of cards

class Deck {
  constructor() {
    this.suits = ["hearts", "diamonds", "clubs", "spades"];
    this.cards = this.createDeck();
    this.shuffleDeck();
  }

  createDeck() {
    const cardRanks = [
      { rank: "Ace", value: 1 },
      { rank: "2", value: 2 },
      { rank: "3", value: 3 },
      { rank: "4", value: 4 },
      { rank: "5", value: 5 },
      { rank: "6", value: 6 },
      { rank: "7", value: 0 },
      { rank: "8", value: 8 },
      { rank: "9", value: 9 },
      { rank: "10", value: 10 },
      { rank: "Jack", value: -1 },
      { rank: "Queen", value: 12 },
      { rank: "King", value: 13 },
    ];

    let deck = [];
    this.suits.forEach((suit) => {
      cardRanks.forEach(({ rank, value }) => {
        deck.push(new Card(rank, suit, value));
      });
    });
    return deck;
  }

  shuffleDeck() {
    for (let i = 0; i < this.cards.length; i++) {
      const j = Math.floor(Math.random() * this.cards.length);
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard() {
    return this.cards.pop();
  }
}

// const deck = new Deck();
// const drawnCard = deck.drawCard();
// console.log("Drawn Card:", drawnCard);

class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.isShown = [false, false, false, false];
  }

  receiveCard(card) {
    this.cards.push(card);
  }

  replaceCard(index, newCard) {
    this.cards[index] = newCard;
    this.isShown[index] = true;
  }

  showHand() {
    return this.cards
      .map((card, index) => {
        return this.isShown[index]
          ? `[${card.rank} of ${card.suit}]`
          : "[Face Down]";
      })
      .join(", ");
  }

  calculateScore() {
    const cardCounts = this.cards.reduce((acc, card) => {
      acc[card.rank] = (acc[card.rank] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(cardCounts).reduce((acc, [rank, count]) => {
      if (rank !== 7 && rank !== "Jack" && count === 2) {
        return acc;
      } else {
        return (
          acc + count * this.cards.find((card) => card.rank === rank).value
        );
      }
    }, 0);
  }
}

// const player1 = new Player("Noor");

// const card1 = new Card("Ace", "Hearts", 1);
// const card2 = new Card("10", "Diamonds", 10);
// const card3 = new Card("King", "Spades", 13);
// const card4 = new Card("7", "Clubs", 0);
// const card5 = new Card("Jack", "Hearts", -1);
// player1.receiveCard(card1);
// player1.receiveCard(card2);
// player1.receiveCard(card3);
// player1.receiveCard(card4);
// player1.receiveCard(card5);

// const score = player1.calculateScore();
// console.log(`${player1.name}'s score: ${score}`);

class Game {
  constructor() {
    this.players = [];
    this.deck = new Deck();
    this.discardPile = [];
  }

  askForNames() {
    const playerOneName = readlineSync.question("first player's name: ");
    const playerTwoName = readlineSync.question("Second player's name: ");
    this.players.push(new Player(playerOneName), new Player(playerTwoName));
    this.startGame();
  }

  startGame() {
    this.deck = new Deck();
    this.discardPile = [];
    this.players.forEach((player) => {
      for (let i = 0; i < 4; i++) {
        player.receiveCard(this.deck.drawCard());
      }
    });
    this.discardPile.push(this.deck.drawCard());
    this.takeTurn(0);
  }

  board() {
    console.log("-------- Board --------");
    this.players.forEach((player) => {
      console.log(`Hand of ${player.name}: ${player.showHand()}`);
    });

    const topCard =
      this.discardPile.length > 0
        ? `${this.discardPile[this.discardPile.length - 1].rank} of ${
            this.discardPile[this.discardPile.length - 1].suit
          }`
        : "Empty";
    console.log(`Discard Pile Top Card: ${topCard}`);
    console.log("--------------------");
  }

  takeTurn(playerIndex) {
    const currentPlayer = this.players[playerIndex];
    this.board();
    console.log(`${currentPlayer.name}'s turn!`);
    if (this.players.every((player) => player.isShown.every(Boolean))) {
      this.finishGame();
    } else {
      this.takeAction(playerIndex);
    }
  }

  takeAction(playerIndex) {
    const action = readlineSync.question(
      "Take an action: 1) Draw from Deck 2) Take from Discard Pile: "
    );
    if (action === "1") {
      this.drawFromDeck(playerIndex);
    } else if (action === "2") {
      this.takeFromDiscard(playerIndex);
    } else {
      this.takeAction(playerIndex);
    }
  }

  drawFromDeck(playerIndex) {
    if (this.deck.cards.length === 0) {
      console.log("Deck is empty! Game Over!");
      this.finishGame(true);
      return;
    }
    const drawnCard = this.deck.drawCard();
    console.log(`Card drawn is ${drawnCard.rank} of ${drawnCard.suit}`);
    const secondAction = readlineSync.question(
      "Take an action: 1) Replace with face-down card 2) Throw to discard pile: "
    );
    if (secondAction === "1") {
      this.replaceCardQuestion(playerIndex, drawnCard);
    } else {
      this.discardPile.push(drawnCard);
      this.takeTurn(playerIndex === 0 ? 1 : 0);
    }
  }

  takeFromDiscard(playerIndex) {
    if (this.discardPile.length === 0) {
      console.log("Discard pile is empty! Instead take from the deck!");
      this.takeTurn(playerIndex);
      return;
    }
    const drawnCard = this.discardPile.pop();
    this.replaceCardQuestion(playerIndex, drawnCard);
  }

  replaceCardQuestion(playerIndex, drawnCard) {
    const currentPlayer = this.players[playerIndex];
    const cardNumber = readlineSync.question(
      "Which card do you want to replace (1-4): "
    );
    const index = Math.max(0, Math.min(3, cardNumber - 1)); // Ensure index is between 0-3

    if (currentPlayer.isShown[index]) {
      console.log("You can only change face down card!");
      this.replaceCardQuestion(playerIndex, drawnCard);
    } else {
      currentPlayer.replaceCard(index, drawnCard);
      console.log(
        `Replaced card with [${drawnCard.rank} of ${drawnCard.suit}]`
      );
      this.takeTurn(playerIndex === 0 ? 1 : 0);
    }
  }

  finishGame(deckIsEmpty = false) {
    if (deckIsEmpty) {
      console.log("Game Over! The deck is empty!");
    } else {
      const scores = this.players.map((player) => player.calculateScore());
      console.log("Final Scores:");
      this.players.forEach((player, index) => {
        console.log(`${player.name}: ${scores[index]}`);
      });

      // Determine the winner based on the lowest score
      const winnerIndex = scores.indexOf(Math.min(...scores)); // Get index of the minimum score
      console.log(`${this.players[winnerIndex].name} is the winner!`);
    }
    this.playAgain();
  }

  playAgain() {
    const playAgain = readlineSync.keyInYNStrict("Play again? ");
    if (playAgain) {
      this.askForNames();
    } else {
      process.exit();
    }
  }
}

const game = new Game();
game.askForNames();
