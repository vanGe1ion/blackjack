import styled from 'styled-components'

export const Container = styled.div`
  font-size: 40px;
  border-radius: 50%;
  border: 5px solid white;
  color: white;
  padding: 10px;
  aspect-ratio: 1/1;
  min-width: 75px;
  text-align: center;

  &.is-point {
    border-color: red;
    color: red;
  }
`
