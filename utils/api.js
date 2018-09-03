import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'MobileFlashcards:deck';

// getDecks: return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        return results ? JSON.parse(results) : []
    })
    .catch((e) => console.log(e))
}

// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results);
        return data.find(d => d.id === id);
    })
    .catch((e) => console.log(e))
}

// saveDeckTitle: take in a single title argument and add it to the decks.
export function saveDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const newDeck = {
            id: createId(),
            title,
            cards: []
        }
        if (results) {
            const data = JSON.parse(results)
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify([...data, newDeck]))
        }
        else {
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify([newDeck]))
        }

        return newDeck;
    })
    .catch((e) => console.log(e))
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(id, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        const deck = data.find(d => d.id === id)
        deck.cards.push(card)
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
    .catch((e) => console.log(e))
}

function createId() {
  return 'id-' + Math.random().toString(36).substr(2, 16)
};
