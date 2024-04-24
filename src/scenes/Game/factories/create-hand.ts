import { createStore, Store, StoreWritable } from 'effector'
import { CardType } from 'src/components/Card'
import { getScore } from '../utils'

type HandFactoryOutput = [
  $hand: StoreWritable<CardType[]>,
  $handScore: Store<number>,
  $isBlackJack: Store<boolean>,
  $isBust: Store<boolean>,
  $isWin: StoreWritable<boolean | null>
]

export default function createHand(): HandFactoryOutput {
  const $hand = createStore<CardType[]>([])
  const $score = $hand.map(getScore)
  const $isBlackJack = $hand.map(hand => hand.length === 2 && getScore(hand) === 21)
  const $isBust = $score.map(score => score > 21)
  const $isWin = createStore<boolean | null>(null)

  return [$hand, $score, $isBlackJack, $isBust, $isWin]
}
