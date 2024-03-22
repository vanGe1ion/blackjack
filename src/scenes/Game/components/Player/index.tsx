import { ReactElement } from 'react'
import { useUnit } from 'effector-react'
import { $isGameStarted, $isLeftHandWin, $leftHand, $leftHandScore } from '../../model'
import Card from 'src/components/Card'
import clsx from 'clsx'
import { FieldContainer, ResultLabel, ScoreLabel } from '../Layout'
import Actions from './components/Actions'

export default function Player(): ReactElement {
  const [leftHand, leftHandScore, isGameStarted, isLeftHandWin] = useUnit([
    $leftHand,
    $leftHandScore,
    $isGameStarted,
    $isLeftHandWin
  ])

  return (
    <FieldContainer>
      <FieldContainer>
        {leftHand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        {isGameStarted ? (
          <ScoreLabel className={clsx({ 'is-blackjack': leftHandScore === 21 })}>{leftHandScore}</ScoreLabel>
        ) : null}
        {isLeftHandWin != null ? (
          <ResultLabel className={clsx({ 'is-win': isLeftHandWin })}>{isLeftHandWin ? 'Win' : 'Lose'}</ResultLabel>
        ) : null}
      </FieldContainer>
      {isGameStarted ? <Actions /> : null}
    </FieldContainer>
  )
}
