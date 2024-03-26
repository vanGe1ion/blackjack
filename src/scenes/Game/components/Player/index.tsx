import { ReactElement } from 'react'
import { useUnit } from 'effector-react'
import { $isGameStarted, $isHandWin, $hand, $handScore, $isHandBlackJack, $isPushScore } from '../../model'
import Card from 'src/components/Card'
import { FieldContainer } from '../Layout'
import Actions from './components/Actions'
import WinLabel from 'src/components/WinLabel'
import ScoreLabel from 'src/components/ScoreLabel'

export default function Player(): ReactElement {
  const [hand, handScore, isGameStarted, isHandWin, isHandBlackJack, isPushScore] = useUnit([
    $hand,
    $handScore,
    $isGameStarted,
    $isHandWin,
    $isHandBlackJack,
    $isPushScore
  ])

  return (
    <FieldContainer>
      <FieldContainer>
        {hand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        {isGameStarted ? <ScoreLabel score={handScore} isBlackJack={isHandBlackJack} /> : null}
        {isHandWin != null ? <WinLabel isWin={isHandWin} isPush={isPushScore} /> : null}
      </FieldContainer>
      {isGameStarted ? <Actions /> : null}
    </FieldContainer>
  )
}
