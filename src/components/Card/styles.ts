import styled from 'styled-components'

export const Container = styled.div`
  width: 110px;
  height: 160px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;

  &.is-red {
    color: red;
  }
`
