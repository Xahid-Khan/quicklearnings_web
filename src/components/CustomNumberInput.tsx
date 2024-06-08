import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps
} from '@mui/base/Unstable_NumberInput'
import { styled } from '@mui/system'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton
      }}
      slotProps={{
        incrementButton: {
          type: 'button',
          children: <AddIcon fontSize='small' />,
          className: 'increment'
        },
        decrementButton: {
          type: 'button',
          children: <RemoveIcon fontSize='small' />
        }
      }}
      {...props}
      ref={ref}
    />
  )
})

export default NumberInput

const StyledInputRoot = styled('div')(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? '#C7D0DD' : '#9DA8B7'};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `
)

const StyledInput = styled('input')(
  ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: ${theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025'};
    background: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#1C2025'};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 100px;
    width: 4rem;
    text-align: center;
  
    &:hover {
      border-color: #3399ff;
    }
  
    &:focus {
      border-color: #3399ff;
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? '#0059B2' : '#b6daff'
      };
    }
  
    &:focus-visible {
      outline: 0;
    }
  `
)

const StyledButton = styled('button')(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${theme.palette.mode === 'dark' ? '#303740' : '#DAE2ED'};
    background: ${theme.palette.mode === 'dark' ? '#1C2025' : '#F3F6F9'};
    color: ${theme.palette.mode === 'dark' ? '#DAE2ED' : '#1C2025'};
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? '#0059B2' : '#007fff'};
      border-color: ${theme.palette.mode === 'dark' ? '#007fff' : '#3399ff'};
      color: #F3F6F9;
    }
  
    &:focus-visible {
      outline: 0;
    }
  
    &.increment {
      order: 1;
    }
  `
)
