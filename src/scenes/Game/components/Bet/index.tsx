import { ReactElement } from 'react'
import { Buttons, ChipButton, Chips, Container, Current, Label, Total } from './styles'
import { Button } from 'src/components/Layout'
import { $bet, $cash, betIncreased, betReset } from '../../model'
import { useUnit } from 'effector-react'
import clsx from 'clsx'

const chips = [
  { color: 'cornflowerblue', value: 1 },
  { color: 'red', value: 5 },
  { color: 'darkgreen', value: 25 },
  { color: 'blue', value: 50 },
  { color: 'black', value: 100 },
  { color: 'blueviolet', value: 500 }
]

export default function Bet(): ReactElement {
  const [bet, cash] = useUnit([$bet, $cash])

  const handleAllInClick = () => betIncreased(cash)
  const handleClearClick = () => betReset(bet)

  return (
    <Container>
      <Total>Your Cash: ${cash}</Total>
      <Label>Current bet:</Label>
      <Current>${bet}</Current>
      <Chips>
        {chips.map(({ color, value }) => (
          <ChipButton
            className={clsx({ hidden: value > cash })}
            key={value}
            $color={color}
            onClick={() => betIncreased(value)}
          >
            {value}
          </ChipButton>
        ))}
      </Chips>
      <Buttons>
        <Button disabled={cash === 0} onClick={handleAllInClick}>
          All in
        </Button>
        <Button disabled={bet === 0} onClick={handleClearClick}>
          Clear
        </Button>
        <Button disabled={bet === 0}>Deal</Button>
      </Buttons>
    </Container>
  )
}
