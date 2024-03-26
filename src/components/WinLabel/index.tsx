import { ReactElement } from 'react'
import { Container } from './styles'
import clsx from 'clsx'

type WinLabelProps = {
  isWin: boolean
  isPush: boolean
}

export default function WinLabel({ isWin, isPush }: WinLabelProps): ReactElement {
  return (
    <Container className={clsx({ 'is-win': isWin, 'is-push': isPush })}>
      {isPush ? 'Push' : isWin ? 'Win' : 'Lose'}
    </Container>
  )
}
