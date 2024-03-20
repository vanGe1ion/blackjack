import { styled } from 'styled-components'
import { BaseCard } from '../Layout'

export const Container = styled(BaseCard)`
  position: relative;
`

export const Turnover = styled(BaseCard)<{ $offset?: number }>`
  background: linear-gradient(white, blue, white, blue);
  position: absolute;
  top: ${({ $offset }) => `calc(-${$offset} * 3px)`};
  left: ${({ $offset }) => `calc(-${$offset} * 3px)`};
`
