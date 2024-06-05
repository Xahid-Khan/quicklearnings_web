import {
  Autocomplete,
  Button,
  CircularProgress,
  Slider,
  TextField,
  Typography
} from '@mui/material'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Loading from './LoadingScreen'
import { QuizSubjectOption, QuizTopicOption } from '@/lib/data_types'

interface QuizOptionProps {
  subjectId: string | number | null
  topicId: string | number | null
  limit: string | number | null
  setSubjectId: Dispatch<SetStateAction<string | number | null>>
  setTopicId: Dispatch<SetStateAction<string | number | null>>
  setLimit: Dispatch<SetStateAction<string | number | null>>
  handleStartQuizButton: () => void
}

const MAX_QUIZ_LIMIT = 50
const MIN_QUIZ_LIMIT = 10
const DEFAULT_QUIZ_LIMIT = 30
const QUIZ_STEP = 10

const QuizOptions = ({
  subjectId,
  topicId,
  limit,
  setSubjectId,
  setTopicId,
  setLimit,
  handleStartQuizButton
}: QuizOptionProps) => {
  const [loading, setLoading] = useState(true)
  const [loadingTopics, setLoadingTopics] = useState(true)
  const [subjects, setSubjects] = useState<QuizSubjectOption[]>([])
  const [topics, setTopics] = useState<QuizTopicOption[]>([])
  const [selectedTopic, setSelectedTopic] = useState<QuizTopicOption | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (selectedSubjectId: string | number | null) => {
    const response = await fetch(
      `/api/quiz/test` +
        (selectedSubjectId ? '?subjectId=' + selectedSubjectId : '')
    )
    if (response.ok) {
      setLoadingTopics(true)
      const data = await response.json()
      data.subjects?.length > 0 ? setSubjects(data.subjects) : setSubjects([])
      data.topics?.length > 0
        ? setTopics([
            {
              id: 0,
              label: 'Random',
              questionsCount: data.topics.reduce(
                (acc: number, item: QuizTopicOption) =>
                  acc + item.questionsCount,
                0
              )
            },
            ...data.topics
          ])
        : setTopics([])

      setLoadingTopics(false)
    } else {
      setError(response.statusText)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(null)
    return
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
              options={subjects}
              isOptionEqualToValue={(
                option: { id: number | string; label: string },
                value: { id: number | string; label: string }
              ) => option.id === value.id && option.label === value.label}
              sx={{ width: 300 }}
              onChange={async (_, value) => {
                setSubjectId(value.id)
                await fetchData(value.id)
                setError(null)
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
                options={topics}
                isOptionEqualToValue={(
                  option: { id: number | string; label: string },
                  value: { id: number | string; label: string }
                ) => option.id === value.id && option.label === value.label}
                sx={{ width: 300 }}
                onChange={async (_, value) => {
                  setError(null)
                  if (value) {
                    setTopicId(value.id)
                    setSelectedTopic(value)
                    value.questionsCount >= MIN_QUIZ_LIMIT
                      ? setError(null)
                      : setError(
                          'The selected topic must have at least 10 questions to practice'
                        )
                  } else setTopicId(null)
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
              key={
                'autocomplete-topic-selection' + selectedTopic?.questionsCount
              }
              sx={{ width: 300 }}
              aria-label='Number of quizzes'
              defaultValue={
                selectedTopic &&
                selectedTopic.questionsCount < DEFAULT_QUIZ_LIMIT
                  ? selectedTopic?.questionsCount
                  : DEFAULT_QUIZ_LIMIT
              }
              disabled={
                selectedTopic
                  ? selectedTopic.questionsCount < MIN_QUIZ_LIMIT
                  : false
              }
              // getAriaValueText={handleSelection}
              onChange={(_, value) => {
                setError(null)
                value instanceof Array ? setLimit(value[0]) : setLimit(value)
              }}
              valueLabelDisplay='auto'
              step={QUIZ_STEP}
              marks
              min={MIN_QUIZ_LIMIT}
              max={
                selectedTopic && selectedTopic.questionsCount < MAX_QUIZ_LIMIT
                  ? selectedTopic?.questionsCount
                  : MAX_QUIZ_LIMIT
              }
            />
          </div>
        </div>
      </div>
      {error ? (
        <div>
          <span className='flex bg-red-100 text-red-700 p-1 rounded'>
            <Typography>{error}</Typography>
          </span>
        </div>
      ) : null}
      <div>
        <Button
          variant='contained'
          color='success'
          onClick={handleStartQuizButton}
          disabled={
            subjectId == null ||
            topicId == null ||
            (selectedTopic
              ? selectedTopic.questionsCount < MIN_QUIZ_LIMIT
              : false)
          }
        >
          <Typography variant='h3'>Start Quiz</Typography>
        </Button>
      </div>
    </div>
  )
}

export default QuizOptions
