import { ReactNode } from 'react'
import { Suits } from 'src/enums/suits'

const SuitLabels: Record<Suits, ReactNode> = {
  [Suits.spades]: <>&spades;</>,
  [Suits.clubs]: <>&clubs;</>,
  [Suits.hearts]: <>&hearts;</>,
  [Suits.diams]: <>&diams;</>
}

export default function getLabelBySuit(suit: Suits): ReactNode {
  return SuitLabels[suit] ?? 'unknown'
}
