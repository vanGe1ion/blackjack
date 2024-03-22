import { styled } from 'styled-components'

export const FieldContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const ScoreLabel = styled.div`
  font-size: 40px;
  border-radius: 50%;
  border: 5px solid white;
  color: white;
  padding: 10px;
  aspect-ratio: 1/1;
  min-width: 75px;
  text-align: center;

  &.is-blackjack {
    border-color: red;
    color: red;
  }
`
