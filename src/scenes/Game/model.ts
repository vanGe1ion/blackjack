import { createEvent, createStore, merge, sample } from 'effector'
import { CardType } from 'src/components/Card'
import { createDeck, getScore } from './utils'
import { and, not, or } from 'patronum'

export const betIncreased = createEvent<number>()
export const betReset = createEvent<number>()
export const betsOff = createEvent()

export const hitPlayed = createEvent()
export const standPlayed = createEvent()
export const pickUpPlayed = createEvent()
export const doublePlayed = createEvent()
export const nextPlayed = createEvent()

export const $cash = createStore(1000)
export const $bet = createStore(0)

export const $deck = createStore<CardType[]>([])
export const $deckLength = $deck.map(deck => deck.length)
export const $needRefreshDeck = $deckLength.map(length => length <= 8)

export const $dealerHand = createStore<CardType[]>([])
export const $dealerHandScore = $dealerHand.map(getScore)
export const $isPossibleDealerBlackJack = $dealerHand.map(hand => hand.length === 2 && hand[1].nominal === 'A')
export const $isDealerBlackJack = $dealerHand.map(hand => getScore(hand) === 21 && hand.length === 2)
export const $isDealerBust = $dealerHandScore.map(score => score > 21)
export const $isDealerHandWin = createStore<boolean | null>(null)

export const $hand = createStore<CardType[]>([])
export const $handScore = $hand.map(getScore)
export const $isHandBlackJack = $hand.map(hand => getScore(hand) === 21 && hand.length === 2)
export const $isHandBust = $handScore.map(score => score > 21)
export const $isHandWin = createStore<boolean | null>(null)
const $isTwentyOne = $handScore.map(score => score === 21)

export const $isGameStarted = createStore(false)
export const $isDealerTurn = createStore(false)
export const $isPushScore = and($isHandWin, $isDealerHandWin)
export const $isPickedUp = createStore(false)

// make bet
$bet.on(betIncreased, (store, value) => store + value).reset(betReset)
$cash.on(betIncreased, (store, value) => store - value).on(betReset, (store, value) => store + value)
$isGameStarted.on(betsOff, () => true)

// game start
const deckRefreshed = sample({
  source: $needRefreshDeck,
  clock: betsOff,
  filter: needRefreshDeck => needRefreshDeck
})
$deck.on(deckRefreshed, createDeck)

// handing cards
const cardsHanded = sample({
  source: { deck: $deck, needRefreshDeck: $needRefreshDeck },
  clock: [betsOff, deckRefreshed],
  filter: ({ needRefreshDeck }) => !needRefreshDeck,
  fn: ({ deck }) => deck.slice(-4).reverse()
})
$deck.on(cardsHanded, (store, distribution) => store.filter(card => distribution.indexOf(card) < 0))
$hand.on(cardsHanded, (_, distribution) => [distribution[0], distribution[2]])
$dealerHand.on(cardsHanded, (_, distribution) => [distribution[1], distribution[3]])

// double
const betDoubled = sample({
  source: { bet: $bet, deck: $deck },
  clock: doublePlayed,
  fn: ({ bet, deck }) => ({ bet, card: deck[deck.length - 1] })
})
$cash.on(betDoubled, (cash, { bet }) => cash - bet)
$bet.on(betDoubled, bet => bet * 2)
$deck.on(betDoubled, deck => deck.slice(0, deck.length - 1))
$hand.on(betDoubled, (hand, { card }) => [...hand, card])

// hit card
const playerHit = sample({
  source: $deck,
  clock: hitPlayed,
  fn: deck => deck[deck.length - 1]
})
$deck.on(playerHit, deck => deck.slice(0, deck.length - 1))
$hand.on(playerHit, (hand, card) => [...hand, card])

// player pick up bet
$isPickedUp.on(pickUpPlayed, () => true)

// player ends turn
const playersTurnEnded = sample({
  source: {
    isGameStarted: $isGameStarted,
    isPossibleDealerBlackJack: $isPossibleDealerBlackJack,
    isHandBlackJack: $isHandBlackJack
  },
  clock: [$isHandBust, $isHandBlackJack, $isDealerBlackJack, $isTwentyOne],
  filter: ({ isGameStarted, isPossibleDealerBlackJack, isHandBlackJack }) =>
    isGameStarted && (!isHandBlackJack || (isHandBlackJack && !isPossibleDealerBlackJack))
})
$isDealerTurn.on([playersTurnEnded, standPlayed, pickUpPlayed, betDoubled], () => true)

// dealer's turn
const $canDealerHit = and(
  not($isHandBlackJack),
  not($isHandBust),
  or(
    not($isDealerTurn),
    $dealerHandScore.map(score => score < 17)
  )
)
const dealerHit = createEvent<CardType>()
sample({
  source: { deck: $deck, canDealerHit: $canDealerHit, isDealerTurn: $isDealerTurn },
  clock: [standPlayed, doublePlayed, dealerHit, $isTwentyOne],
  filter: ({ canDealerHit, isDealerTurn }) => isDealerTurn && canDealerHit,
  fn: ({ deck }) => deck[deck.length - 1],
  target: dealerHit
})
$deck.on(dealerHit, store => store.slice(0, store.length - 1))
$dealerHand.on(dealerHit, (hand, card) => [...hand, card])

// blackjack stand
const blackJackStandPlayed = sample({
  source: $isHandBlackJack,
  clock: standPlayed,
  filter: isHandBlackJack => isHandBlackJack
})

// end game
const gameEnded = merge([$canDealerHit, blackJackStandPlayed, pickUpPlayed, $isHandBust, $isDealerBust])
const winChecked = sample({
  source: {
    dealerHandScore: $dealerHandScore,
    handScore: $handScore,
    isDealerTurn: $isDealerTurn,
    isPickedUp: $isPickedUp
  },
  clock: gameEnded,
  filter: ({ isDealerTurn }) => isDealerTurn,
  fn: ({ dealerHandScore, handScore, isPickedUp }) => {
    if (handScore > 21) return { isDealerWin: true, isPlayerWin: false }
    if (dealerHandScore > 21) return { isDealerWin: false, isPlayerWin: true }
    if (isPickedUp) return { isDealerWin: false, isPlayerWin: true }
    if (dealerHandScore === handScore) return { isDealerWin: true, isPlayerWin: true }
    return { isDealerWin: dealerHandScore > handScore, isPlayerWin: dealerHandScore < handScore }
  }
})
$isDealerHandWin.on(winChecked, (_, { isDealerWin }) => isDealerWin)
$isHandWin.on(winChecked, (_, { isPlayerWin }) => isPlayerWin)

// cash calculating
const winningCounted = sample({
  source: {
    isDealerHandWin: $isDealerHandWin,
    isHandWin: $isHandWin,
    isHandBlackJack: $isHandBlackJack,
    bet: $bet,
    isPickedUp: $isPickedUp
  },
  clock: nextPlayed,
  fn: ({ isDealerHandWin, isHandWin, isHandBlackJack, isPickedUp, bet }) => {
    if (isPickedUp) return bet * 2
    if (!isDealerHandWin && isHandBlackJack) return Math.floor(bet * 2.5)
    if (isDealerHandWin && isHandWin) return bet
    if (!isDealerHandWin && isHandWin) return bet * 2
    return 0
  }
})
$cash.on(winningCounted, (cash, winning) => cash + winning)
$bet.reset(winningCounted)

// reset game
$isGameStarted.reset(winningCounted)
$isDealerTurn.reset(winningCounted)
$dealerHand.reset(winningCounted)
$hand.reset(winningCounted)
$isDealerHandWin.reset(winningCounted)
$isHandWin.reset(winningCounted)
$isPickedUp.reset(winningCounted)
