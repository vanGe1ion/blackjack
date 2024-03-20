import { ReactElement } from 'react'
import { Container, TableField } from './styles'
import Bet from './components/Bet'
// import Card, { CardType, CardNominal } from 'src/components/Card'
// import { Suits } from 'src/enums/suits'
// import shuffle from 'src/utils/shuffle'

// const suitValues = Object.values(Suits).filter(value => typeof value === 'number')
// const cardNominals: CardNominal[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']

// const createDeck = (): CardType[] => {
//   const deck: CardType[] = suitValues.flatMap(suit => cardNominals.map(nominal => ({ nominal, suit: suit as Suits })))
//   shuffle(deck)
//   return deck
// }

export default function Game(): ReactElement {
  return (
    <Container>
      <TableField></TableField>
      <TableField>
        <Bet />
      </TableField>
    </Container>
  )
}
