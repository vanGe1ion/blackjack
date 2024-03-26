import { ReactElement } from 'react'
import { FieldContainer } from '../Layout'
import { useUnit } from 'effector-react'
import {
  $dealerHand,
  $dealerHandScore,
  $isDealerBlackJack,
  $isDealerHandWin,
  $isDealerTurn,
  $isGameStarted,
  $isPushScore
} from '../../model'
import { BaseTurnover } from 'src/components/Layout'
import Card from 'src/components/Card'
import WinLabel from 'src/components/WinLabel'
import ScoreLabel from 'src/components/ScoreLabel'

export default function Dealer(): ReactElement {
  const [dealerHand, dealerHandScore, isDealerTurn, isGameStarted, isDealerHandWin, isDealerBlackJack, isPushScore] =
    useUnit([
      $dealerHand,
      $dealerHandScore,
      $isDealerTurn,
      $isGameStarted,
      $isDealerHandWin,
      $isDealerBlackJack,
      $isPushScore
    ])

  if (isDealerTurn)
    return (
      <FieldContainer>
        {dealerHand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        <ScoreLabel score={dealerHandScore} isBlackJack={isDealerBlackJack} />
        {isDealerHandWin != null ? <WinLabel isWin={isDealerHandWin} isPush={isPushScore} /> : null}
      </FieldContainer>
    )

  return (
    <FieldContainer>
      {isGameStarted ? (
        <>
          <BaseTurnover />
          <Card card={dealerHand[1]} />
        </>
      ) : null}
    </FieldContainer>
  )
}
