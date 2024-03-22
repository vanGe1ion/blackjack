import { ReactElement } from 'react'
import { FieldContainer, ScoreLabel } from '../Layout'
import { useUnit } from 'effector-react'
import { $dealerHand, $dealerHandScore, $isDealerTurn, $isGameStarted } from '../../model'
import { BaseTurnover } from 'src/components/Layout'
import Card from 'src/components/Card'
import clsx from 'clsx'

export default function Dealer(): ReactElement {
  const [dealerHand, dealerHandScore, isDealerTurn, isGameStarted] = useUnit([
    $dealerHand,
    $dealerHandScore,
    $isDealerTurn,
    $isGameStarted
  ])

  if (isDealerTurn)
    return (
      <FieldContainer>
        {dealerHand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        <ScoreLabel className={clsx({ 'is-blackjack': dealerHandScore === 21 })}>{dealerHandScore}</ScoreLabel>
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
