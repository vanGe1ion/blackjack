import { CardType, CardNominal } from 'src/components/Card'
import { Suits } from 'src/enums/suits'

const suitValues = Object.values(Suits).filter(value => typeof value === 'number')
const cardNominals: CardNominal[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']

const shuffleDeck = (array: CardType[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const createDeck = (): CardType[] => {
  const deck = suitValues.flatMap(suit => cardNominals.map(nominal => ({ nominal, suit: suit as Suits })))
  shuffleDeck(deck)
  return deck
}

const getHardCardScore = (card: CardType): number => {
  if (card.nominal === 'A') return 0
  if (typeof card.nominal === 'string') return 10
  return card.nominal
}

export const getScore = (hand: CardType[] | null): number => {
  if (!hand) return 0
  const hardScore = hand.reduce((sum, card) => sum + getHardCardScore(card), 0)
  const softScore = hand
    .filter(({ nominal }) => nominal === 'A')
    .reduce((sum, _, __, array) => {
      if (hardScore === 10 && array.length > 1) return sum + 1
      if (sum + 11 > 21) return sum + 1
      return sum + 11
    }, hardScore)
  return softScore
}
