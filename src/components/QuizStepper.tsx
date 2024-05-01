import { Stepper, Step, StepLabel, Slider, styled } from '@mui/material'

interface QuizStepperProps {
  activeIndex: number
  limit: number
}

const QuizStepper = ({ activeIndex, limit }: QuizStepperProps) => {
  const stepperList = Array(limit / 5 + 1)
    .fill(5)
    .map((n, i) => n * i)
  const labels = stepperList.map((val) => ({
    value: val,
    label: `${val}`
  }))

  const QuizSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none'
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit'
      },
      '&::before': {
        display: 'none'
      }
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
      },
      '& > *': {
        transform: 'rotate(45deg)'
      }
    }
  })
  return (
    <QuizSlider
      valueLabelDisplay='auto'
      aria-label='pretto slider'
      value={activeIndex}
      step={5}
      marks={labels}
      min={0}
      max={limit}
    />
  )
}

export default QuizStepper
