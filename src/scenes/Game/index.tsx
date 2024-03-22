import { ReactElement } from 'react'
import { Container, TableField } from './styles'
import Bet from './components/Bet'
import Deck from './components/Deck'
import Dealer from './components/Dealer'
import Player from './components/Player'

export default function Game(): ReactElement {
  return (
    <Container>
      <TableField>
        <Deck />
        <Dealer />
      </TableField>
      <TableField>
        <Bet />
        <Player />
      </TableField>
    </Container>
  )
}
