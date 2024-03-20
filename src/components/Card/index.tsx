import { ReactElement } from 'react'
import { Container } from './styles'
import clsx from 'clsx'
import { Suits } from 'src/enums/suits'
import getLabelBySuit from 'src/computed/get-label-by-suit'

type NumberNominal = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type PaintNominal = 'A' | 'J' | 'Q' | 'K'
export type CardNominal = NumberNominal | PaintNominal

export type CardType = {
  nominal: CardNominal
  suit: Suits
}

type CardProps = {
  card: CardType
}

export default function Card({ card }: CardProps): ReactElement {
  const { nominal, suit } = card
  const isRed = suit === Suits.hearts || suit === Suits.diams

  return (
    <Container className={clsx({ 'is-red': isRed })}>
      {nominal} {getLabelBySuit(suit)}
    </Container>
  )
}
