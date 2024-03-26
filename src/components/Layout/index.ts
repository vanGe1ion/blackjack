import { rgba } from 'polished'
import { styled } from 'styled-components'

export const BaseCard = styled.div`
  width: 110px;
  height: 160px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background-color: white;
`

export const BaseTurnover = styled(BaseCard)`
  background: linear-gradient(white, blue, white, blue);
`

export const Button = styled.button<{ $color?: string }>`
  color: white;
  background-color: ${({ $color }) => $color ?? 'darkturquoise'};
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ $color }) => rgba($color ?? 'darkturquoise', 0.9)};

    &:active {
      background-color: ${({ $color }) => rgba($color ?? 'darkturquoise', 0.7)};
    }
  }

  &:disabled {
    background-color: ${({ $color }) => rgba($color ?? 'darkturquoise', 0.3)};
    cursor: not-allowed;
  }
`
