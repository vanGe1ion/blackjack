import { ReactElement } from 'react'
import { FieldContainer, ResultLabel, ScoreLabel } from '../Layout'
import { useUnit } from 'effector-react'
import { $dealerHand, $dealerHandScore, $isDealerHandWin, $isDealerTurn, $isGameStarted } from '../../model'
import { BaseTurnover } from 'src/components/Layout'
import Card from 'src/components/Card'
import clsx from 'clsx'

export default function Dealer(): ReactElement {
  const [dealerHand, dealerHandScore, isDealerTurn, isGameStarted, isDealerHandWin] = useUnit([
    $dealerHand,
    $dealerHandScore,
    $isDealerTurn,
    $isGameStarted,
    $isDealerHandWin
  ])
  console.log(isDealerTurn)

  if (isDealerTurn)
    return (
      <FieldContainer>
        {dealerHand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        <ScoreLabel className={clsx({ 'is-blackjack': dealerHandScore === 21 })}>{dealerHandScore}</ScoreLabel>
        {isDealerHandWin != null ? (
          <ResultLabel className={clsx({ 'is-win': isDealerHandWin })}>{isDealerHandWin ? 'Win' : 'Lose'}</ResultLabel>
        ) : null}
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
