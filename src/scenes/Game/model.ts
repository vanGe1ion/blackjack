import { createEvent, createStore } from 'effector'

export const betsOff = createEvent()
export const betIncreased = createEvent<number>()
export const betReset = createEvent<number>()

// export const splitPlayed = createEvent()
// export const doublePlayed= createEvent()
// export const hitPlayed = createEvent()
// export const standPlayed = createEvent()

export const $cash = createStore<number>(1000)
export const $bet = createStore<number>(0)

// export const $deck = createStore<CardType[]>([])
// export const $dealerHand = createStore<CardType[]>([])
// export const $leftHand = createStore<CardType[]>([])
// export const $rightHand = createStore<CardType[] | null>(null)

// export const $isDealerTurn = createStore<boolean>(false)

$bet.on(betIncreased, (store, value) => store + value).reset(betReset)
$cash.on(betIncreased, (store, value) => store - value).on(betReset, (store, value) => store + value)
