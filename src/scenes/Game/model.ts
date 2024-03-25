import { createEvent, createStore, merge, sample } from 'effector'
import { CardType } from 'src/components/Card'
import { createDeck, getScore } from './utils'

export const betIncreased = createEvent<number>()
export const betReset = createEvent<number>()
export const betsOff = createEvent()

export const hitPlayed = createEvent()
export const standPlayed = createEvent()
// export const splitPlayed = createEvent()
// export const doublePlayed= createEvent()
export const nextStarted = createEvent()

export const $cash = createStore(1000)
export const $bet = createStore(0)
export const $isGameStarted = createStore(false)

export const $deck = createStore<CardType[]>([])
export const $deckLength = $deck.map(deck => deck.length)

export const $dealerHand = createStore<CardType[]>([])
export const $dealerHandScore = $dealerHand.map(getScore)
export const $canDealerHit = $dealerHandScore.map(score => score < 17)
export const $isDealerBlackJack = $dealerHandScore.map(score => score === 21)
export const $isDealerOverflow = $dealerHandScore.map(score => score > 21)
export const $isDealerHandWin = createStore<boolean | null>(null)

export const $hand = createStore<CardType[]>([])
export const $handScore = $hand.map(getScore)
export const $isHandBlackJack = $handScore.map(score => score === 21)
export const $isHandOverflow = $handScore.map(score => score > 21)
export const $isHandWin = createStore<boolean | null>(null)

export const $isDealerTurn = createStore<boolean>(false)

// make bet
$bet.on(betIncreased, (store, value) => store + value).reset(betReset)
$cash.on(betIncreased, (store, value) => store - value).on(betReset, (store, value) => store + value)
$isGameStarted.on(betsOff, () => true)

// game start
$deck.on(betsOff, createDeck)
const cardsHanded = sample({
  source: $deck,
  clock: betsOff,
  filter: deck => deck.length !== 0,
  fn: deck => deck.slice(-4).reverse()
})
$deck.on(cardsHanded, (store, distribution) => store.filter(card => distribution.indexOf(card) < 0))
$hand.on(cardsHanded, (_, distribution) => [distribution[0], distribution[2]])
$dealerHand.on(cardsHanded, (_, distribution) => [distribution[1], distribution[3]])

// hit card
const playerHit = sample({
  source: $deck,
  clock: hitPlayed,
  fn: deck => deck[deck.length - 1]
})
$deck.on(playerHit, store => store.slice(0, store.length - 1))
$hand.on(playerHit, (hand, card) => [...hand, card])

// need check
const playersTurnEnded = merge([$isHandOverflow, $isHandBlackJack, standPlayed])
$isDealerTurn.on(playersTurnEnded, (store) => !store)

// dealer's turn
const dealerPlayed = merge([$isHandBlackJack, standPlayed])
const dealerHit = createEvent<CardType>()
sample({
  source: { deck: $deck, canDealerHit: $canDealerHit, isGameStarted: $isGameStarted },
  clock: [dealerPlayed, dealerHit],
  filter: ({ canDealerHit, isGameStarted }) => isGameStarted && canDealerHit,
  fn: ({ deck }) => deck[deck.length - 1],
  target: dealerHit
})
$deck.on(dealerHit, store => store.slice(0, store.length - 1))
$dealerHand.on(dealerHit, (hand, card) => [...hand, card])

// end game
// need check
const gameEnded = merge([$canDealerHit, $isHandOverflow, $isDealerOverflow])
const winChecked = sample({
  source: { dealerHandScore: $dealerHandScore, handScore: $handScore },
  clock: gameEnded,
  filter: ({ dealerHandScore, handScore }) => dealerHandScore !== 0 && handScore !== 0,
  fn: ({ dealerHandScore, handScore }) => {
    if (handScore > 21) return { isDealerWin: true, isPlayerWin: false }
    if (dealerHandScore > 21) return { isDealerWin: false, isPlayerWin: true }
    if (dealerHandScore === handScore) return { isDealerWin: true, isPlayerWin: true }
    return { isDealerWin: dealerHandScore > handScore, isPlayerWin: dealerHandScore < handScore }
  }
})
$isDealerHandWin.on(winChecked, (_, { isDealerWin }) => isDealerWin)
$isHandWin.on(winChecked, (_, { isPlayerWin }) => isPlayerWin)

// new game
$cash.reset(nextStarted)
$bet.reset(nextStarted)
$deck.reset(nextStarted)
$dealerHand.reset(nextStarted)
$hand.reset(nextStarted)
$isGameStarted.reset(nextStarted)
$isDealerHandWin.reset(nextStarted)
$isHandWin.reset(nextStarted)
$isDealerTurn.reset(nextStarted)
