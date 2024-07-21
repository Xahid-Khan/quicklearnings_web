'use client'
import { useRef, useState } from 'react'
import BaseModal from '@/components/BaseModal'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import { useTopicContext } from '@/contexts/topicContext'
import { quizTypes } from '@/lib/data_types'

const QuizDataCrudModal = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { subjectOptions } = useTopicContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [subjectId, setSubjectId] = useState<number | null>(null)
  const [prompt, setPrompt] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [topicId, setTopicId] = useState<number>(-1)
  const [hint, setHint] = useState<string>('')

  return (
    <BaseModal
      isOpen={true}
      modalTitle='ADD QUIZ DATA'
      onClose={() => {
        console.log('ADD NEW')
      }}
      rootRef={rootRef}
      key={'quiz-data-crud-modal'}
    >
      <form>
        <FormControl className='flex flex-col w-full'>
          <Autocomplete
            className='mt-4'
            disablePortal
            id='combo-custom-quiz-subject-selection'
            disabled={loading}
            value={
              subjectOptions.find((option) => option.id === subjectId) || null
            }
            options={subjectOptions}
            getOptionLabel={(option) => option.title}
            getOptionKey={(option) => option.id}
            renderInput={(params) => (
              <TextField required {...params} label='Subjects' />
            )}
            onChange={(_, val) => {
              val ? setSubjectId(val.id) : setSubjectId(-1)
            }}
          />
          <Autocomplete
            disablePortal
            className='mt-4'
            id='autocomplete-quiz-type-selection'
            disabled={loading}
            disableClearable
            options={quizTypes}
            isOptionEqualToValue={(
              option: { id: number | string; label: string },
              value: { id: number | string; label: string }
            ) => option.id === value.id && option.label === value.label}
            onChange={async (_, value) => {
              console.log(value)
              // setQuizType(value.id)
              // setError(null)
            }}
            renderInput={(params) => <TextField {...params} label='Types' />}
          />

          <TextField
            className='mt-4'
            autoComplete='off'
            required
            label={'Inquiry/Prompt'}
            value={prompt}
            disabled={loading}
            helperText={
              <>
                Anything written in this field would be used as a question when
                attempting the quiz. (max 256 Characters)
              </>
            }
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
            inputProps={{ max: 256 }}
          />
          <TextField
            className='mt-4'
            autoComplete='off'
            required
            label={'Solution/Response'}
            value={response}
            disabled={loading}
            helperText={
              <>
                Anything written in this field would be used as an answer to the
                above inquiry when attempting the quiz. (max 256 Characters)
              </>
            }
            onChange={(e) => {
              setResponse(e.target.value)
            }}
            inputProps={{ max: 256 }}
          />
          <TextField
            className='mt-4'
            autoComplete='off'
            label={'Hint'}
            value={hint}
            disabled={loading}
            helperText={
              <>
                Anything written in this field would be used as hint during
                (some) quizzes. (max 128 Characters)
                <br />
                e.g., hint for reading 練習 is れんしゅう
              </>
            }
            onChange={(e) => {
              setHint(e.target.value)
            }}
            inputProps={{ max: 128 }}
          />
        </FormControl>
      </form>
    </BaseModal>
  )
}

export default QuizDataCrudModal
