import { ReactElement } from 'react'
import { Container } from './styles'
import clsx from 'clsx'

type ScoreLabelProps = {
  score: number
  isBlackJack: boolean
}

export default function ScoreLabel({ score, isBlackJack }: ScoreLabelProps): ReactElement {
  return <Container className={clsx({ 'is-point': score === 21 })}>{isBlackJack ? 'BJ' : score}</Container>
}
