import styled from 'styled-components'

export const Container = styled.div`
  font-size: 40px;
  color: darkturquoise;

  &.is-push {
    color: white;
  }

  &.is-win:not(.is-push) {
    color: red;
  }
`
