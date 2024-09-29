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
  }
}
