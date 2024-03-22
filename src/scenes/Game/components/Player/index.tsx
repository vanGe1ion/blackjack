import { ReactElement } from 'react'
import { useUnit } from 'effector-react'
import { $isGameStarted, $leftHand, $leftHandScore } from '../../model'
import Card from 'src/components/Card'
import clsx from 'clsx'
import { FieldContainer, ScoreLabel } from '../Layout'
import Actions from './components/Actions'

export default function Player(): ReactElement {
  const [leftHand, leftHandScore, isGameStarted] = useUnit([$leftHand, $leftHandScore, $isGameStarted])

  return (
    <FieldContainer>
      <FieldContainer>
        {leftHand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        {isGameStarted ? (
          <ScoreLabel className={clsx({ 'is-blackjack': leftHandScore === 21 })}>{leftHandScore}</ScoreLabel>
        ) : null}
      </FieldContainer>
      {isGameStarted ? <Actions /> : null}
    </FieldContainer>
  )
}
