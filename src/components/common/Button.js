import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledButton = styled.button`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  padding: 0;

  ${({ color, theme }) => color && css`
    background-color: ${theme.colors.button[color]};
  `}
`

const Button = ({ onClick, color }) => <StyledButton onClick={onClick} color={color} />

export default Button
