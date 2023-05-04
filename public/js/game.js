// card.js

const getCard = () => {
    const suit = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    const rank = [
        'Ace',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'Jack',
        'Queen',
        'King',
    ];
    const randomSuit = suit[Math.floor(Math.random() * suit.length)];
    const randomRank = rank[Math.floor(Math.random() * rank.length)];
    return `${randomRank} of ${randomSuit}`;
};

const CARD_VALUES = {
    'Ace': 14,
    'King': 13,
    'Queen': 12,
    'Jack': 11,
    '10': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
};

function compareCards(currentCard, nextCard, action, bet) {
    const currentCardValue = getCardValue(currentCard);
    const nextCardValue = getCardValue(nextCard);

    if (currentCardValue === nextCardValue) {
        return 'draw';
    }

    if ((currentCardValue < nextCardValue && action === "high") || (currentCardValue > nextCardValue && action === "low")) {
        return 'win';
    } else {
        return 'lose';
    }
}

function getCardValue(card) {
    const cardValue = CARD_VALUES[card.split(' ')[0]];
    if (cardValue === "Ace") {
        return 14;
    } else if (cardValue === "King") {
        return 13;
    } else if (cardValue === "Queen") {
        return 12;
    } else if (cardValue === "Jack") {
        return 11;
    } else {
        return parseInt(cardValue, 10); // 数字に変換する
    }
}


module.exports = {
    getCard,
    compareCards,
};
