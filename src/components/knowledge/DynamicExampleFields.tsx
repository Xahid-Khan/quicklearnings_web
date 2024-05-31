import { TextField, Typography } from '@mui/material'
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import EastIcon from '@mui/icons-material/East'
import { Examples } from '@/src/lib/knowledgeContracts'

const DynamicExampleFields = ({
  examples,
  setExamples,
  loading
}: {
  examples: Examples
  setExamples: Dispatch<SetStateAction<Examples>>
  loading: boolean
}): ReactElement => {
  const removeExampleFieldByIndex = (index: number) => {
    setExamples(examples.filter((_, i) => i != index))
  }

  const handleExampleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    let formOptions = [...examples]
    if (event.target.name == 'prompt')
      formOptions[index].prompt = event.target.value
    else formOptions[index].solution = event.target.value
    setExamples(formOptions)
  }
  return (
    <>
      <Typography variant='caption'>
        * In this section, you can add up to 20 Examples, each with a maximum
        length of 256 characters. These examples will be used during the “Fill
        in the blanks”, “Build a sentence”, and “Sentence Structure” type of
        questions. <br />* To add fields, simply click the “ADD EXAMPLE FIELD”
        button. If you need to remove an option, click the X next to it.
      </Typography>
      {examples.map((option, index) => {
        return (
          <div
            className='flex flex-row items-center flex-wrap'
            key={'example-' + index}
          >
            <TextField
              name={'prompt'}
              className='mt-4 flex-grow'
              autoComplete='off'
              required
              label={'Prompt'}
              placeholder='e.g., What is your name?'
              key={'example-prompt-' + index}
              value={option.prompt}
              disabled={loading}
              onChange={(e) => {
                handleExampleChange(e, index)
              }}
              inputProps={{ max: 256 }}
            />
            <EastIcon key={'arrow-' + index} className='mx-1 mt-4 size-8' />
            <TextField
              name='response'
              className='mt-4 flex-grow'
              autoComplete='off'
              required
              label={'Response'}
              placeholder='e.g., お名前は何ですか。'
              key={'example-response-' + index}
              value={option.solution}
              disabled={loading}
              onChange={(e) => {
                handleExampleChange(e, index)
              }}
              inputProps={{ max: 256 }}
            />
            <ClearIcon
              className='mx-1 mt-4 size-8'
              key={'clear-' + index}
              color='error'
              onClick={() => {
                if (!loading) removeExampleFieldByIndex(index)
              }}
            />
          </div>
        )
      })}
    </>
  )
}

export default DynamicExampleFields
