import { ReactElement } from 'react'
import { Container } from './styles'
import { Button } from 'src/components/Layout'
import { $isDealerTurn, hitPlayed, standPlayed } from 'src/scenes/Game/model'
import { useUnit } from 'effector-react'

export default function Actions(): ReactElement {
  const [isDealerTurn] = useUnit([$isDealerTurn])

  const handleHitClick = () => hitPlayed()
  const handleStandClick = () => standPlayed()

  return (
    <Container>
      <Button disabled={isDealerTurn} onClick={handleHitClick}>Hit</Button>
      <Button disabled={isDealerTurn} onClick={handleStandClick}>Stand</Button>
    </Container>
  )
}
