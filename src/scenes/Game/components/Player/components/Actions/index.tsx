import { ReactElement } from 'react'
import { Container } from './styles'
import { Button } from 'src/components/Layout'
import {
  $isDealerTurn,
  $isHandBlackJack,
  $isHandWin,
  hitPlayed,
  gameOn,
  standPlayed,
  pickUpPlayed,
  $hand,
  doublePlayed,
  $bet,
  $cash
} from 'src/scenes/Game/model'
import { useUnit } from 'effector-react'

export default function Actions(): ReactElement {
  const [isDealerTurn, isHandWin, isHandBlackJack, hand, cash, bet] = useUnit([
    $isDealerTurn,
    $isHandWin,
    $isHandBlackJack,
    $hand,
    $cash,
    $bet
  ])

  const handleHitClick = () => hitPlayed()
  const handleStandClick = () => standPlayed()
  const handleNextClick = () => gameOn()
  const handlePickUpClick = () => pickUpPlayed()
  const handleDoubleClick = () => doublePlayed()

  return (
    <Container>
      <Button disabled={isDealerTurn || hand.length > 2 || cash < bet} onClick={handleDoubleClick}>
        Double
      </Button>
      <Button disabled={isDealerTurn || isHandBlackJack} onClick={handleHitClick}>
        Hit
      </Button>
      <Button disabled={isDealerTurn} onClick={handleStandClick}>
        Stand
      </Button>
      {!isDealerTurn && isHandBlackJack ? (
        <Button $color="red" onClick={handlePickUpClick}>
          Pick up
        </Button>
      ) : null}
      {isHandWin != null ? <Button onClick={handleNextClick}>Next game</Button> : null}
    </Container>
  )
}
