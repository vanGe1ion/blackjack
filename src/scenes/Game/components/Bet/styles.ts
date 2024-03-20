import { hideVisually, rgba } from 'polished'
import { styled } from 'styled-components'

export const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const Total = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: white;
`

export const Label = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: white;
`

export const Current = styled.div`
  font-size: 70px;
  font-weight: 600;
  color: white;
`

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  justify-content: center;
`

export const ChipButton = styled.button<{ $color?: string }>`
  width: 90px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${({ $color }) => $color ?? 'cornflowerblue'};
  color: white;
  font-size: 30px;
  font-weight: 600;
  border: 10px dashed white;
  cursor: pointer;

  &:hover {
    background-color: ${({ $color }) => rgba($color ?? 'cornflowerblue', 0.5)};

    &:active {
      background-color: ${({ $color }) => rgba($color ?? 'cornflowerblue', 0.8)};
    }
  }

  &.hidden {
    ${hideVisually()}
  }
`

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`
