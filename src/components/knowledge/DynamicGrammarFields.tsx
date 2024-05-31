import { TextField, Typography } from '@mui/material'
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { GrammarOptions } from '@/src/lib/knowledgeContracts'
import EastIcon from '@mui/icons-material/East'

const DynamicGrammarFields = ({
  grammarOptions,
  setGrammarOptions,
  loading
}: {
  grammarOptions: GrammarOptions
  setGrammarOptions: Dispatch<SetStateAction<GrammarOptions>>
  loading: boolean
}): ReactElement => {
  const removeGrammarOptionFieldByIndex = (index: number) => {
    setGrammarOptions(grammarOptions.filter((_, i) => i != index))
  }

  const handleOptionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    let formOptions = [...grammarOptions]
    if (event.target.name == 'grammar')
      formOptions[index].grammar = event.target.value
    else formOptions[index].usage = event.target.value
    setGrammarOptions(formOptions)
  }
  return (
    <>
      <Typography variant='caption'>
        * In this section, you can add up to 20 Grammar words, each with a
        maximum length of 64 characters for this inquiry/prompt. These options
        will be used during the “Fill in the blanks” type of questions. <br />*
        To add fields, simply click the “ADD GRAMMAR FIELD” button. If you need
        to remove an option, click the X next to it.
      </Typography>
      {grammarOptions.map((option, index) => {
        return (
          <div
            className='flex flex-row flex-wrap items-center'
            key={'grammar-' + index}
          >
            <TextField
              name='grammar'
              className='mt-4 flex-grow'
              autoComplete='off'
              required
              label={'Grammar Option'}
              placeholder='e.g., attend | attended | present'
              key={'grammar-input-' + index}
              value={option.grammar}
              disabled={loading}
              onChange={(e) => {
                handleOptionChange(e, index)
              }}
              inputProps={{ max: 64 }}
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
                if (!loading) removeGrammarOptionFieldByIndex(index)
              }}
            />
          </div>
        )
      })}
    </>
  )
}

export default DynamicGrammarFields
