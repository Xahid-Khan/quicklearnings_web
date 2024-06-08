'use client'
import { useEffect, useState } from 'react'
import QuizStepper from '@/components/QuizStepper'
// import QuizElement from '@/components/QuizElement'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography
} from '@mui/material'
import Loading from './LoadingScreen'
import Image from 'next/image'
import { KnowledgeViewData } from '../lib/data_types'
import { useRouter } from 'next/navigation'

interface QuizProps {
  subjectId: string | number
  topicId: string | number
  limit: string | number
}

interface OptionsProps {
  id: number | null
  answer: string | null
  hint: string | null
}

const QuizScreen = ({ subjectId, topicId, limit }: QuizProps) => {
  const router = useRouter()
  const quizLimit = Number(limit)
  const [loading, setLoading] = useState(true)
  const [quizData, setQuizData] = useState<KnowledgeViewData[]>([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [options, setOptions] = useState<OptionsProps[]>([])
  const [selected, setSelected] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(false)
  const [wrongAnswer, setWrongAnswer] = useState<boolean>(false)
  const [finished, setFinished] = useState<boolean>(false)

  const generateOptions = (
    currentIndex: number,
    data: KnowledgeViewData[] = []
  ): OptionsProps[] => {
    const optionsList: OptionsProps[] = []
    const idTracker: number[] = []
    const currentData = data.length > 0 ? data : quizData
    while (optionsList.length < 3) {
      const randomIndex = Math.floor(Math.random() * quizLimit)
      if (
        currentData[currentIndex].answer != currentData[randomIndex].answer &&
        !idTracker.includes(currentData[randomIndex].id ?? 0)
      ) {
        optionsList.push({
          id: currentData[randomIndex].id,
          answer: currentData[randomIndex].answer,
          hint: currentData[randomIndex].hint
        })
        idTracker.push(currentData[randomIndex].id ?? 0)
      }
    }
    optionsList.push({
      id: currentData[currentIndex].id,
      answer: currentData[currentIndex].answer,
      hint: currentData[currentIndex].hint
    })
    const outcome = optionsList.sort(() => Math.random() - 0.5)
    return outcome
  }

  useEffect(() => {
    const fetchQuizData = async () => {
      const response = await fetch(
        `/api/quiz/test?subjectId=${subjectId}&topicId=${topicId}&limit=${
          quizLimit + 20
        }`
      )
      if (response.ok) {
        const data: KnowledgeViewData[] = await response.json()
        setQuizData(data)
        const quizOptions = generateOptions(0, data)
        setOptions(quizOptions)
        setLoading(false)
      }
    }
    fetchQuizData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading />
  }

  const quizFinished = () => {
    router.replace('/quiz/test/result')
  }

  const handleAnswerSubmission = () => {
    if (selected == quizData[quizIndex].answer) {
      setCorrectAnswer(true)
      setWrongAnswer(false)
    } else {
      setCorrectAnswer(false)
      setWrongAnswer(true)
    }
  }

  const nextQuestion = () => {
    const newIndex = quizIndex + 1
    if (newIndex <= quizLimit - 1) {
      setOptions([])
      setQuizIndex(newIndex)
      const quizOptions = generateOptions(newIndex)
      setSelected('')
      setOptions(quizOptions)
    } else {
      quizFinished()
    }
    setCorrectAnswer(false)
    setWrongAnswer(false)
  }

  return (
    <div className='min-w-[75%] min-h-[100vh] rounded flex flex-col justify-between bg-slate-300 p-3'>
      <div className='px-1'>
        <QuizStepper activeIndex={quizIndex + 1} limit={quizLimit} />
      </div>
      <Divider sx={{ margin: '10px 0' }} />
      <div className='min-w-full min-h-full flex flex-row flex-wrap justify-around'>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Card sx={{ minWidth: 340, maxWidth: 450 }}>
            <CardActionArea>
              <Image
                src={'/TopicBG.png'}
                alt='Quick Learning BG LOGO IMAGE'
                width={450}
                height={300}
                priority
              />
              <CardContent>
                <Typography gutterBottom variant='h4' component='div'>
                  {quizData[quizIndex].question}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Typography gutterBottom variant='h4' component='div'>
            {quizData[quizIndex].question}
          </Typography>
        </Box>
        <div className='min-w-fit flex flex-col'>
          {options.map((value) => (
            <Card
              key={value.answer}
              onClick={() => setSelected(value.answer ?? '')}
              sx={{
                minWidth: 340,
                maxWidth: 450,
                margin: '10px 5px',
                border: selected == value.answer ? '3px #1976D2 solid' : ''
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {value.answer}
                  </Typography>
                  <Typography gutterBottom variant='body2' component='div'>
                    ({value.hint})
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
      <Divider sx={{ marginTop: '10px' }} />
      <div className='min-w-full flex justify-center my-5'>
        <Button
          variant='contained'
          color='success'
          sx={{ width: 300, height: 50, fontSize: '1.25rem' }}
          disabled={selected == ''}
          onClick={
            finished
              ? quizFinished
              : correctAnswer || wrongAnswer
              ? nextQuestion
              : handleAnswerSubmission
          }
        >
          {finished
            ? 'Finished'
            : correctAnswer || wrongAnswer
            ? 'Next Question'
            : 'Check Answer'}
        </Button>
      </div>
      <Image
        src={'/wrong.gif'}
        alt='WRONG ANSWER'
        width={650}
        height={350}
        style={{
          display: wrongAnswer ? 'block' : 'none',
          position: 'absolute',
          zIndex: 10,
          bottom: '20%',
          right: '10%'
        }}
      />
      <Image
        src={'/correct.gif'}
        alt='WRONG ANSWER'
        width={650}
        height={350}
        style={{
          display: correctAnswer ? 'block' : 'none',
          position: 'absolute',
          zIndex: 10,
          bottom: '20%',
          right: '10%'
        }}
      />
    </div>
  )
}

export default QuizScreen
