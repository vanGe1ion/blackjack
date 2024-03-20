import { ReactElement } from 'react'
import { Container, Turnover } from './styles'

export default function Deck(): ReactElement {
  return (
    <Container>
      {[...Array(5).keys()].map(val => (
        <Turnover key={val} $offset={val} />
      ))}
    </Container>
  )
}
