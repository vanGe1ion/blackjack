import { ReactElement } from 'react'
import { useUnit } from 'effector-react'
import { $isGameStarted, $isHandWin, $hand, $handScore } from '../../model'
import Card from 'src/components/Card'
import clsx from 'clsx'
import { FieldContainer, ResultLabel, ScoreLabel } from '../Layout'
import Actions from './components/Actions'

export default function Player(): ReactElement {
  const [hand, handScore, isGameStarted, isHandWin] = useUnit([$hand, $handScore, $isGameStarted, $isHandWin])
  console.log('isHandWin', isHandWin)
  return (
    <FieldContainer>
      <FieldContainer>
        {hand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        {isGameStarted ? (
          <ScoreLabel className={clsx({ 'is-blackjack': handScore === 21 })}>{handScore}</ScoreLabel>
        ) : null}
        {isHandWin != null ? (
          <ResultLabel className={clsx({ 'is-win': isHandWin })}>{isHandWin ? 'Win' : 'Lose'}</ResultLabel>
        ) : null}
      </FieldContainer>
      {isGameStarted ? <Actions /> : null}
    </FieldContainer>
  )
}
