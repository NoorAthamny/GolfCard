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

const deck = new Deck();
const drawnCard = deck.drawCard(); // Draw a card
console.log("Drawn Card:", drawnCard); // Log the drawn card
