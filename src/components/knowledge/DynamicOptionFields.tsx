import { TextField, Typography } from '@mui/material'
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { PossibleOptions } from '@/src/lib/knowledgeContracts'
import EastIcon from '@mui/icons-material/East'

const DynamicOptionFields = ({
  options,
  setOptions,
  loading
}: {
  options: PossibleOptions
  setOptions: Dispatch<SetStateAction<PossibleOptions>>
  loading: boolean
}): ReactElement => {
  const removeOptionFieldByIndex = (index: number) => {
    setOptions(options.filter((_, i) => i != index))
  }

  const handleOptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    let formOptions = [...options]
    if (event.target.name == 'option')
      formOptions[index].option = event.target.value
    else formOptions[index].usage = event.target.value
    setOptions(formOptions)
  }
  return (
    <>
      <Typography variant='caption'>
        * In this section, you can add up to 20 options, each with a maximum
        length of 128 characters. These options will be used during the
        multiple-choice questions. <br />* To add fields, simply click the “ADD
        OPTION FIELD” button. If you need to remove an option, click the X next
        to it.
      </Typography>
      {options.map((option, index) => {
        return (
          <div
            className='flex flex-row flex-wrap items-center'
            key={'option-' + index}
          >
            <TextField
              name='option'
              className='mt-4 flex-grow'
              autoComplete='off'
              required
              label={'Quiz Options'}
              placeholder='e.g., animal | bird | insect'
              key={'option-input-' + index}
              value={option.option}
              disabled={loading}
              onChange={(e) => {
                handleOptionChange(e, index)
              }}
              inputProps={{ max: 128 }}
            />
            <EastIcon key={'arrow-' + index} className='mx-1 mt-4 size-8' />
            <TextField
              name='usage'
              className='mt-4 flex-grow'
              autoComplete='off'
              required
              label={'Explanation'}
              placeholder='e.g., An is used instead of a when the words starts with a vowel'
              key={'grammar-explanation-' + index}
              value={option.usage}
              disabled={loading}
              onChange={(e) => {
                handleOptionChange(e, index)
              }}
              inputProps={{ max: 128 }}
            />
            <ClearIcon
              className='mx-1 mt-4 size-8'
              key={'clear-' + index}
              color='error'
              onClick={() => {
                if (!loading) removeOptionFieldByIndex(index)
              }}
            />
          </div>
        )
      })}
    </>
  )
}

export default DynamicOptionFields
