'use client'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography
} from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import DynamicOptionFields from './DynamicOptionFields'
import DynamicGrammarFields from './DynamicGrammarFields'
import DynamicExampleFields from './DynamicExampleFields'
import {
  Examples,
  GrammarOptions,
  knowledge,
  PossibleOptions,
  updateKnowledge
} from '@/src/lib/knowledgeContracts'
import { useRouter, useSearchParams } from 'next/navigation'
import { useKnowledgeContext } from '@/src/contexts/knowledgeContext'

const KnowledgeForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams?.get('editId')
  const {
    topicOptionList,
    saveNewKnowledge,
    knowledgeToEdit,
    setKnowledgeToEdit,
    updateKnowledgeData
  } = useKnowledgeContext()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>(knowledgeToEdit?.prompt ?? '')
  const [response, setResponse] = useState<string>(
    knowledgeToEdit?.solution ?? ''
  )
  const [topicId, setTopicId] = useState<number>(knowledgeToEdit?.topicId ?? -1)
  const [hint, setHint] = useState<string>(knowledgeToEdit?.hint ?? '')
  const [notes, setNotes] = useState<string>(knowledgeToEdit?.notes ?? '')
  const [options, setOptions] = useState<PossibleOptions>(
    knowledgeToEdit?.options ?? []
  )
  const [grammarOptions, setGrammarOptions] = useState<GrammarOptions>(
    knowledgeToEdit?.grammarOptions ?? []
  )
  const [examples, setExamples] = useState<Examples>(
    knowledgeToEdit?.examples ?? []
  )

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const knowledgeData = {
      topicId,
      prompt,
      solution: response,
      hint,
      notes,
      options,
      grammarOptions,
      examples
    }
    let newKnowledge
    if (editId && knowledgeToEdit) {
      newKnowledge = knowledge.safeParse({
        ...knowledgeData,
        id: knowledgeToEdit.id,
        created_at: knowledgeToEdit.created_at,
        updated_at: knowledgeToEdit.updated_at
      })
      if (newKnowledge.success) {
        const outcome = await updateKnowledgeData(newKnowledge.data)
        if (typeof outcome == 'string') {
          setError(outcome)
        } else {
          router.back()
        }

        setLoading(false)
      }
    } else {
      const newKnowledge = updateKnowledge.safeParse(knowledgeData)
      if (newKnowledge.success) {
        const outcome = await saveNewKnowledge(newKnowledge.data)
        if (typeof outcome == 'string') {
          setError(outcome)
        } else {
          router.back()
        }

        setLoading(false)
      }
    }
    if (newKnowledge && !newKnowledge.success) {
      setError(
        newKnowledge?.error.message
          .split(',')
          .filter((item) => item.includes('message'))[0] ?? 'Unknown Error'
      )
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmission}>
        <FormControl className={`w-full ${loading ? 'opacity-50' : ''}`}>
          <Autocomplete
            className='my-4'
            disablePortal
            id='combo-box-topic-selection'
            value={
              topicOptionList.find((option) => option.id === topicId) || null
            }
            disabled={loading}
            options={topicOptionList}
            getOptionLabel={(option) => option.title}
            getOptionKey={(option) => option.id}
            renderInput={(params) => (
              <TextField required {...params} label='Topics' />
            )}
            onChange={(_, val) => {
              val ? setTopicId(val.id) : setTopicId(-1)
            }}
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
          <TextField
            className='mt-4'
            autoComplete='off'
            label={'Notes'}
            value={notes}
            multiline
            rows={5}
            disabled={loading}
            helperText={
              <>
                Utilise this field to make personal notes to help you understand
                in detail. (max 512 Characters)
              </>
            }
            onChange={(e) => {
              setNotes(e.target.value)
            }}
            inputProps={{ max: 512 }}
          />
          <Divider className='mt-4'>Example Section</Divider>
          <DynamicExampleFields
            examples={examples}
            setExamples={setExamples}
            loading={loading}
          />
          <Button
            className='mt-4'
            onClick={() => {
              if (options.length < 20) {
                setExamples([...examples, { prompt: '', solution: '' }])
              }
            }}
          >
            Add Example Field
          </Button>
          <Divider className='mt-4'>Quiz Options Section</Divider>
          <DynamicOptionFields
            options={options}
            setOptions={setOptions}
            loading={loading}
          />
          <Button
            className='mt-4'
            onClick={() => {
              if (options.length < 20) {
                setOptions([...options, { option: '', usage: '' }])
              }
            }}
          >
            Add Option Field
          </Button>
          <Divider className='mt-4'>Grammar Section</Divider>
          <DynamicGrammarFields
            grammarOptions={grammarOptions}
            setGrammarOptions={setGrammarOptions}
            loading={loading}
          />
          <Button
            className='mt-4'
            onClick={() => {
              if (options.length < 20) {
                setGrammarOptions([
                  ...grammarOptions,
                  { grammar: '', usage: '' }
                ])
              }
            }}
          >
            Add Grammar Field
          </Button>
          <Divider />
          {error ? (
            <div className='flex w-full justify-center pt-4'>
              <span className='p-2 bg-red-200 text-red-700 rounded-xl'>
                <Typography variant='body2'>{error}</Typography>
              </span>
            </div>
          ) : null}
          <Box className='w-full' sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              className='mt-10 mx-5 text-lg w-full bg-gray-500 hover:bg-gray-500'
              variant='contained'
              onClick={() => {
                setKnowledgeToEdit(null)
                router.back()
              }}
            >
              Cancel
            </Button>
            <Button
              className='mt-10 mx-5 text-lg w-full'
              variant='contained'
              onClick={handleFormSubmission}
            >
              Save
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button
              className='mt-10 mx-5 text-lg float-end w-36'
              variant='contained'
              onClick={handleFormSubmission}
            >
              Save
            </Button>
            <Button
              className='mt-10 mx-5 text-lg float-end w-36 bg-gray-400 hover:bg-gray-500'
              variant='contained'
              type='button'
              onClick={() => {
                setKnowledgeToEdit(null)
                router.back()
              }}
            >
              Cancel
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  )
}

export default KnowledgeForm
