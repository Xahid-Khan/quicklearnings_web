import { ReactElement, useRef, useState } from 'react'
import BaseModal from '../BaseModal'
import {
  Typography,
  FormControl,
  TextField,
  LinearProgress,
  Button,
  Autocomplete
} from '@mui/material'
import { useKnowledgeContext } from '@/src/contexts/knowledgeContext'
import {
  Knowledge,
  ExpandKnowledge,
  expandKnowledge,
  knowledge
} from '@/src/lib/knowledgeContracts'

const KnowledgeCRUDForm = (): ReactElement => {
  const {
    closeModal,
    knowledgeToEdit,
    saveNewKnowledge,
    updateKnowledgeData,
    topicOptionList
  } = useKnowledgeContext()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>(knowledgeToEdit?.prompt ?? '')
  const [solution, setSolution] = useState<string>(
    knowledgeToEdit?.solution ?? ''
  )
  const [topicId, setTopicId] = useState<number>(knowledgeToEdit?.topicId ?? -1)
  const [hint, setHint] = useState<string>(knowledgeToEdit?.hint ?? '')
  const [notes, setNotes] = useState<string>(knowledgeToEdit?.notes ?? '')

  const isInputDataValid = (): Knowledge | ExpandKnowledge | null => {
    const knowledgeData = {
      topicId,
      prompt,
      solution: solution,
      hint,
      notes
    }

    const outcome = knowledgeToEdit?.id
      ? knowledge.safeParse({
          ...knowledgeData,
          id: knowledgeToEdit.id,
          created_at: knowledgeToEdit.created_at,
          updated_at: knowledgeToEdit.updated_at,
          userId: knowledgeToEdit.userId
        })
      : expandKnowledge.safeParse({ ...knowledgeData })

    if (outcome.success) {
      return outcome.data
    } else {
      setError(
        outcome.error.message
          .split(',')
          .filter((item) => item.includes('message'))[0] ?? 'Unknown Error'
      )
    }
    return null
  }

  const handleAddOrEditKnowledge = async () => {
    setLoading(true)

    const validKnowledgeData = isInputDataValid()

    if (validKnowledgeData) {
      const outcome = knowledgeToEdit?.id
        ? await updateKnowledgeData(knowledge.parse(validKnowledgeData))
        : await saveNewKnowledge(validKnowledgeData)

      if (typeof outcome == 'string') {
        setError(`${outcome}`)
      } else {
        closeModal()
      }
    }
    setLoading(false)
  }
  return (
    <>
      <FormControl className='w-full pt-10'>
        <Autocomplete
          className='mt-4'
          disablePortal
          id='combo-box-topic-selection'
          disabled={loading}
          value={
            topicOptionList.find((option) => option.id === topicId) || null
          }
          options={topicOptionList}
          getOptionLabel={(option) => option.title}
          getOptionKey={(option) => option.id}
          renderInput={(params) => (
            <TextField required {...params} label='Subjects' />
          )}
          onChange={(_, val) => {
            val ? setTopicId(val.id) : setTopicId(-1)
          }}
        />
        <TextField
          className='mt-4'
          required
          autoComplete='off'
          id='new-knowledge-prompt'
          label='Prompt'
          type='text'
          multiline
          rows={3}
          disabled={loading}
          value={prompt}
          onChange={(e) => {
            setError(null)
            setPrompt(e.target.value)
          }}
        />
        <TextField
          className='mt-4'
          required
          autoComplete='off'
          id='new-knowledge-solution'
          label='Solution'
          type='text'
          multiline
          rows={3}
          disabled={loading}
          value={solution}
          onChange={(e) => {
            setError(null)
            setSolution(e.target.value)
          }}
        />
        <TextField
          className='mt-4'
          required
          autoComplete='off'
          id='new-knowledge-hint'
          label='Hint'
          type='text'
          disabled={loading}
          value={hint}
          onChange={(e) => {
            setError(null)
            setHint(e.target.value)
          }}
        />
        <TextField
          className='mt-4'
          required
          autoComplete='off'
          multiline
          rows={5}
          id='new-knowledge-notes'
          label='Notes'
          type='text'
          disabled={loading}
          value={notes}
          onChange={(e) => {
            setError(null)
            setNotes(e.target.value)
          }}
        />
        {error ? (
          <span className='flex w-full justify-center pt-3'>
            <Typography className='bg-red-100 text-red-700 p-2 rounded'>
              {error}
            </Typography>
          </span>
        ) : null}
        {loading ? <LinearProgress /> : null}
        <Button
          variant='contained'
          className='mt-10'
          disabled={loading || !prompt || !solution || !notes}
          onClick={handleAddOrEditKnowledge}
        >
          Save
        </Button>
      </FormControl>
    </>
  )
}

const KnowledgeCrudModal = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { knowledgeModalOpen, closeModal, knowledgeToEdit } =
    useKnowledgeContext()

  return (
    <BaseModal
      modalTitle={knowledgeToEdit ? 'Update Knowledge' : 'Expand Knowledge'}
      rootRef={rootRef}
      isOpen={knowledgeModalOpen}
      onClose={closeModal}
    >
      <KnowledgeCRUDForm />
    </BaseModal>
  )
}

export default KnowledgeCrudModal
