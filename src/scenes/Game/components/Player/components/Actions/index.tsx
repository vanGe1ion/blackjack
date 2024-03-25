import { ReactElement } from 'react'
import { Container } from './styles'
import { Button } from 'src/components/Layout'
import { $isDealerTurn, $isHandWin, hitPlayed, nextStarted, standPlayed } from 'src/scenes/Game/model'
import { useUnit } from 'effector-react'

export default function Actions(): ReactElement {
  const [isDealerTurn, isHandWin] = useUnit([$isDealerTurn, $isHandWin])

  const handleHitClick = () => hitPlayed()
  const handleStandClick = () => standPlayed()
  const handleNextClick = () => nextStarted()

  return (
    <Container>
      <Button disabled={isDealerTurn} onClick={handleHitClick}>
        Hit
      </Button>
      <Button disabled={isDealerTurn} onClick={handleStandClick}>
        Stand
      </Button>
      {isHandWin != null ? <Button onClick={handleNextClick}>Next game</Button> : null}
    </Container>
  )
}
