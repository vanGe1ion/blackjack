import { ReactElement } from 'react'
import { Container, CountLabel, DeckHolder, deckLayers, Turnover } from './styles'
import { $deckLength } from '../../model'
import { useUnit } from 'effector-react'

export default function Deck(): ReactElement {
  const [deckLength] = useUnit([$deckLength])

  return (
    <Container>
      <DeckHolder>
        {[...Array(deckLayers).keys()].map(val => (
          <Turnover key={val} $layer={val} />
        ))}
        <CountLabel>{deckLength}</CountLabel>
      </DeckHolder>
    </Container>
  )
}
