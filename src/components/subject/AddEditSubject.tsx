import {
  Button,
  Divider,
  FormControl,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material'
import CustomSwitch from '@/src/components/CustomSwitch'
import { useState } from 'react'
import { useSubjectContext } from '@/src/contexts/subjectContext'

export const AddSubject = () => {
  const { closeModal, editSubject, saveNewSubject, saveEditedSubject } =
    useSubjectContext()
  const [title, setTitle] = useState<string>(editSubject?.title ?? '')
  const [description, setDescription] = useState<string>(
    editSubject?.description ?? ''
  )
  const [isPublic, setIsPublic] = useState<boolean>(
    editSubject?.isPublic ?? false
  )
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddOrEditSubject = async (): Promise<void> => {
    setLoading(true)
    const outcome = editSubject?.id
      ? await saveEditedSubject({
          id: editSubject?.id,
          title,
          description,
          isPublic
        })
      : await saveNewSubject({ title, description, isPublic })

    if (typeof outcome == 'string') {
      setError(`${outcome}`)
    } else {
      closeModal()
    }
    setLoading(false)
  }

  return (
    <>
      <Divider>
        <Typography variant='h6'>
          {(editSubject ? 'Edit' : 'Add') + ' Subject'}
        </Typography>
      </Divider>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          className='mt-3'
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
          className='mt-3'
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
          className='mt-5'
          disabled={loading || !title || !description}
          onClick={handleAddOrEditSubject}
        >
          Save
        </Button>
      </FormControl>
    </>
  )
}
