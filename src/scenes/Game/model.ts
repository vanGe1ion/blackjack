import { createEvent, createStore, merge, sample } from 'effector'
import { CardType } from 'src/components/Card'
import { createDeck, getScore } from './utils'

export const betIncreased = createEvent<number>()
export const betReset = createEvent<number>()
export const betsOff = createEvent()

export const cardsHanded = createEvent<CardType[]>()
export const hitPlayed = createEvent()
export const cardHit = createEvent<CardType>()

export const standPlayed = createEvent()
// export const splitPlayed = createEvent()
// export const doublePlayed= createEvent()

export const $cash = createStore(1000)
export const $bet = createStore(0)
export const $isGameStarted = createStore(false)

export const $deck = createStore<CardType[]>([])
export const $deckLength = $deck.map(deck => deck.length)

export const $dealerHand = createStore<CardType[]>([])
export const $dealerHandScore = $dealerHand.map(getScore)
export const $isDealerBlackJack = $dealerHandScore.map(score => score === 21)
// export const $isDealerOverflow = $dealerHandScore.map(score => score > 21)
export const $isDealerHandWin = createStore<boolean | null>(null)

export const $leftHand = createStore<CardType[]>([])
export const $leftHandScore = $leftHand.map(getScore)
export const $isLeftBlackJack = $leftHandScore.map(score => score === 21)
export const $isLeftOverflow = $leftHandScore.map(score => score > 21)
export const $isLeftHandWin = createStore<boolean | null>(null)

// export const $rightHand = createStore<CardType[] | null>(null)
// export const $rightHandScore = $rightHand.map(getScore)

export const $isDealerTurn = createStore<boolean>(false)

$bet.on(betIncreased, (store, value) => store + value).reset(betReset)
$cash.on(betIncreased, (store, value) => store - value).on(betReset, (store, value) => store + value)
$isGameStarted.on(betsOff, () => true)

$deck.on(betsOff, createDeck)
sample({
  source: $deck,
  clock: betsOff,
  filter: deck => deck.length !== 0,
  fn: deck => deck.slice(-4).reverse(),
  target: cardsHanded
})
$deck.on(cardsHanded, (store, hand) => store.filter(card => hand.indexOf(card) < 0))
$leftHand.on(cardsHanded, (_, distribution) => [distribution[0], distribution[2]])
$dealerHand.on(cardsHanded, (_, distribution) => [distribution[1], distribution[3]])

sample({
  source: $deck,
  clock: hitPlayed,
  fn: deck => deck[deck.length - 1],
  target: cardHit
})
$deck.on(cardHit, store => store.slice(0, store.length - 1))
$leftHand.on(cardHit, (hand, card) => [...hand, card])
const playersTurnEnded = merge([$isLeftOverflow, $isLeftBlackJack, standPlayed])
$isDealerTurn.on(playersTurnEnded, () => true)

$isLeftHandWin.on($isLeftOverflow, (_, value) => !value)
$isDealerHandWin.on($isLeftOverflow, (_, value) => value)
