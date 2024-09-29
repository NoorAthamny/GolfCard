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

const player1 = new Player("Noor");

const card1 = new Card("Ace", "Hearts", 1);
const card2 = new Card("10", "Diamonds", 10);
const card3 = new Card("King", "Spades", 13);
const card4 = new Card("7", "Clubs", 0);
const card5 = new Card("Jack", "Hearts", -1);
player1.receiveCard(card1);
player1.receiveCard(card2);
player1.receiveCard(card3);
player1.receiveCard(card4);
player1.receiveCard(card5);

const score = player1.calculateScore();
console.log(`${player1.name}'s score: ${score}`);
