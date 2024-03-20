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

export const Button = styled.button`
  color: white;
  background-color: darkturquoise;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${rgba('darkturquoise', 0.9)};

    &:active {
      background-color: ${rgba('darkturquoise', 0.7)};
    }
  }

  &:disabled {
    background-color: ${rgba('darkturquoise', 0.3)};
    cursor: not-allowed;
  }
`
