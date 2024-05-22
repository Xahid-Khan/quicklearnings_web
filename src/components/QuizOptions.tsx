import {
  Autocomplete,
  Button,
  CircularProgress,
  Slider,
  TextField,
  Typography
} from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loading from './LoadingScreen'
import { QuizSubjectOption, QuizTopicOption } from '../lib/data_types'

interface QuizOptionProps {
  setSubjectId: (val: number | string) => void
  setTopicId: (val: number | string) => void
  setLimit: (val: number | string) => void
  handleStartQuizButton: () => void
}

const QuizOptions = ({
  setSubjectId,
  setTopicId,
  setLimit,
  handleStartQuizButton
}: QuizOptionProps) => {
  const [loading, setLoading] = useState(true)
  const [loadingTopics, setLoadingTopics] = useState(true)
  const [subjects, setSubjects] = useState<QuizSubjectOption[]>([
    { id: 0, label: 'Random' }
  ])
  const [topics, setTopics] = useState<QuizTopicOption[]>([
    { id: 0, label: 'Random' }
  ])

  const fetchData = async (langId: string | number | null) => {
    const response = await fetch(
      `/api/quiz` + (langId ? '?subjectId=' + langId : '')
    )
    if (response.ok) {
      setLoadingTopics(true)
      const data = await response.json()
      setSubjects([{ id: 0, label: 'Random' }, ...data.subjects])
      data.topics.length > 0
        ? setTopics([{ id: 0, label: 'Random' }, ...data.topics])
        : setTopics([])
      setLoading(false)
      setLoadingTopics(false)
    }
  }

  useEffect(() => {
    fetchData(null)
  }, [])

  if (loading) return <Loading />

  return (
    <div className='min-h-[75vh] min-w-[75%] rounded bg-slate-300 p-2 my-5 flex flex-col items-center justify-around'>
      <div className='flex flex-col items-center my-5'>
        <Image
          src={'/logo.png'}
          alt='Quick Learnings Logo'
          width={150}
          height={150}
          style={{ borderRadius: 50 }}
          priority
        />
        <Typography variant='h3'>QUIZ OPTIONS</Typography>
      </div>
      <div>
        <div className='w-full flex justify-center'>
          <div className='quizOptionList flex flex-row flex-wrap items-center my-5'>
            <label className='w-52'>
              <Typography>SELECT SUBJECT</Typography>
            </label>
            <Autocomplete
              disablePortal
              disableClearable
              id='autocomplete-subject-selection'
              defaultValue={{ id: 0, label: 'Random' }}
              options={subjects}
              isOptionEqualToValue={(
                option: { id: number | string; label: string },
                value: { id: number | string; label: string }
              ) => option.id === value.id && option.label === value.label}
              sx={{ width: 300 }}
              onChange={async (_, value) => {
                await fetchData(value.id)
                setSubjectId(value.id)
              }}
              renderInput={(params) => {
                return <TextField {...params} id={params.id} label='Subject' />
              }}
            />
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <div className='quizOptionList flex flex-row flex-wrap items-center my-5'>
            <label className='w-52'>
              <Typography>SELECT TOPIC</Typography>
            </label>
            {loadingTopics ? (
              <div style={{ width: 300 }}>
                <CircularProgress />
              </div>
            ) : (
              <Autocomplete
                disablePortal
                id='autocomplete-topic-selection'
                disableClearable
                defaultValue={{ id: 0, label: 'Random' }}
                options={topics}
                isOptionEqualToValue={(
                  option: { id: number | string; label: string },
                  value: { id: number | string; label: string }
                ) => option.id === value.id && option.label === value.label}
                sx={{ width: 300 }}
                onChange={async (_, value) => {
                  value ? setTopicId(value.id) : setTopicId(-1)
                }}
                renderInput={(params) => (
                  <TextField {...params} label='Topic' />
                )}
              />
            )}
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <div className='quizOptionList flex flex-row flex-wrap items-center my-5'>
            <label className='w-52'>
              <Typography>NUMBER OF QUIZ</Typography>
            </label>
            <Slider
              key={'autocomplete-topic-selection'}
              sx={{ width: 300 }}
              aria-label='Number of quizzes'
              defaultValue={30}
              // getAriaValueText={handleSelection}
              onChange={(_, value) => {
                value instanceof Array ? setLimit(value[0]) : setLimit(value)
              }}
              valueLabelDisplay='auto'
              step={10}
              marks
              min={10}
              max={50}
            />
          </div>
        </div>
      </div>
      <div>
        <Button
          variant='contained'
          color='success'
          onClick={handleStartQuizButton}
        >
          <Typography variant='h3'>Start Quiz</Typography>
        </Button>
      </div>
    </div>
  )
}

export default QuizOptions
