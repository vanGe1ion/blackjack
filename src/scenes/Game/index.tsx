import { ReactElement } from 'react'
import { Container } from './styles'
import Card, { CardType } from 'src/components/Card'

const createDeck = (): CardType[] => {
  return []
}

export default function Game(): ReactElement {
  const deck = createDeck()
  return (
    <Container>
      {deck.map(card => (
        <Card card={card} />
      ))}
    </Container>
  )
}
