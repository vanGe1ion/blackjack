import { styled } from 'styled-components'
import { BaseCard, BaseTurnover } from 'src/components/Layout'

const deckOffset = 3
export const deckLayers = 5

export const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const DeckHolder = styled(BaseCard)`
  position: relative;
`

export const Turnover = styled(BaseTurnover)<{ $layer?: number }>`
  position: absolute;
  top: ${({ $layer }) => `calc(-${$layer} * ${deckOffset}px)`};
  left: ${({ $layer }) => `calc(-${$layer} * ${deckOffset}px)`};
`

export const CountLabel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: -${(deckLayers - 1) * deckOffset}px;
  left: -${(deckLayers - 1) * deckOffset}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
