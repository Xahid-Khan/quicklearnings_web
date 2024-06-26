import { ReactElement, useRef, useState } from 'react'
import { useTopicContext } from '@/contexts/topicContext'
import BaseModal from '../BaseModal'
import {
  Typography,
  FormControl,
  TextField,
  LinearProgress,
  Button,
  Autocomplete
} from '@mui/material'
import CustomSwitch from '@/components/CustomSwitch'

const TopicCRUDForm = (): ReactElement => {
  const {
    closeModal,
    editTopic,
    saveNewTopic,
    saveEditedTopic,
    subjectOptions,
    urlSubjectId
  } = useTopicContext()

  const [title, setTitle] = useState<string>(editTopic?.title ?? '')
  const [description, setDescription] = useState<string>(
    editTopic?.description ?? ''
  )
  const [subjectId, setSubjectId] = useState<number>(
    editTopic?.subjectId ?? (urlSubjectId == 'all' ? -1 : Number(urlSubjectId))
  )
  const [isPublic, setIsPublic] = useState<boolean>(
    editTopic?.isPublic ?? false
  )
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddOrEditTopic = async () => {
    setLoading(true)
    const outcome = editTopic?.id
      ? await saveEditedTopic({
          id: editTopic?.id,
          title,
          description,
          isPublic,
          subjectId
        })
      : await saveNewTopic({ title, description, isPublic, subjectId })

    if (typeof outcome == 'string') {
      setError(`${outcome}`)
    } else {
      closeModal()
    }
    setLoading(false)
  }
  return (
    <>
      <FormControl className='w-full pt-10'>
        {urlSubjectId == 'all' ? (
          <Autocomplete
            className='mt-4'
            disablePortal
            id='combo-box-subject-selection'
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
        ) : null}
        <TextField
          className='mt-4'
          autoComplete='off'
          required
          id='new-subject-title'
          label='Title'
          type='text'
          disabled={loading}
          value={title}
          onChange={(e) => {
            setError('')
            setTitle(e.target.value)
          }}
        />
        <TextField
          className='mt-4'
          autoComplete='off'
          required
          multiline
          rows={5}
          id='new-subject-description'
          label='Description'
          type='text'
          disabled={loading}
          value={description}
          onChange={(e) => {
            setError('')
            setDescription(e.target.value)
          }}
        />
        <span className='flex flex-row justify-around mt-4'>
          <span
            className={`rounded flex items-center px-2 ${
              isPublic
                ? 'bg-orange-100 text-orange-700 '
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            <Typography>{isPublic ? 'Public' : 'Private'}</Typography>
          </span>
          <CustomSwitch
            disabled={loading}
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </span>
        <span className='flex flex-row justify-around mt-1'>
          <Typography variant='caption' color={'gray'}>
            Public subjects can be viewed by all users
          </Typography>
        </span>
        {error == '' ? null : (
          <span className='flex w-full justify-center pt-3'>
            <Typography className='bg-red-100 text-red-700 p-2 rounded'>
              {error}
            </Typography>
          </span>
        )}
        {loading ? <LinearProgress /> : null}
        <Button
          variant='contained'
          className='mt-10'
          disabled={loading || !title || !description || !subjectId}
          onClick={handleAddOrEditTopic}
        >
          Save
        </Button>
      </FormControl>
    </>
  )
}

const TopicCrudModal = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { topicModalOpen, closeModal, editTopic } = useTopicContext()

  return (
    <BaseModal
      modalTitle={editTopic ? 'Edit Topic' : 'New Topic'}
      rootRef={rootRef}
      isOpen={topicModalOpen}
      onClose={closeModal}
    >
      <TopicCRUDForm />
    </BaseModal>
  )
}

export default TopicCrudModal
