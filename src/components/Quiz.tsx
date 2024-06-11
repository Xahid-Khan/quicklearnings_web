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
import CustomSwitch from './CustomSwitch'
import { useAuthModalContext } from '@/contexts/authContext'
import {
  OptionsProps,
  useQuizAttemptContext
} from '@/contexts/quizAttemptContext'
import QuizAttemptOutcomeModal from './QuizAttemptOutcomeModal'

interface QuizProps {
  subjectId: string | number
  topicId: string | number
  limit: string | number
}

const QuizScreen = ({ subjectId, topicId, limit }: QuizProps) => {
  const router = useRouter()
  const quizLimit = Number(limit)
  const [quizIndex, setQuizIndex] = useState(0)
  const [disableSelection, setDisableSelection] = useState<boolean>(false)
  const {
    showOutcomeModal,
    setShowOutcomeModal,
    loading,
    quizData,
    setQuizData,
    options,
    setOptions,
    selected,
    setSelected,
    correctAnswer,
    setCorrectAnswer,
    showHint,
    setShowHint,
    finished,
    fetchQuizData,
    generateOptions
  } = useQuizAttemptContext()

  useEffect(() => {
    if (quizData.length == 0) fetchQuizData(quizLimit, subjectId, topicId)
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading />
  }

  const quizFinished = () => {
    localStorage.removeItem('quiz_started')
    router.replace('/quiz/attempt/result')
  }

  const handleAnswerSubmission = () => {
    setDisableSelection(true)
    if (selected?.answer == quizData[quizIndex].answer) {
      setCorrectAnswer(true)
    } else {
      setCorrectAnswer(false)
    }
    setShowOutcomeModal(true)
  }

  const nextQuestion = () => {
    const newIndex = quizIndex + 1
    if (newIndex <= quizLimit - 1) {
      setOptions([])
      setQuizIndex(newIndex)
      const quizOptions = generateOptions(newIndex, quizData, quizLimit)
      setSelected(null)
      setOptions(quizOptions)
    } else {
      quizFinished()
    }
    setCorrectAnswer(false)
    setShowOutcomeModal(false)
    setDisableSelection(false)
  }

  return (
    <>
      <div className='min-w-[75%] min-h-[100vh] rounded flex flex-col justify-between items-center bg-slate-300 p-3'>
        {/* Header */}
        <div className='flex flex-row w-full justify-between items-center'>
          <div>
            <Button
              variant='contained'
              color='error'
              onClick={() => quizFinished()}
            >
              END
            </Button>
          </div>
          <div className='flex flex-row'>
            <div className='flex flex-col items-center'>
              <span className='p-0 mb-[-8px]'>Hint: </span>
              <CustomSwitch
                sx={{ padding: 0, margin: 0 }}
                disabled={loading}
                checked={showHint}
                onChange={(e) => setShowHint(e.target.checked)}
              />
            </div>
            {/* <div className='flex flex-col items-center'>
            <span className='p-0 mb-[-8px]'>Hint: </span>
            <CustomSwitch sx={{ padding: 0, margin: 0, maxWidth: '20px' }} />
          </div> */}
          </div>
        </div>
        <Divider sx={{ margin: '5px 0' }} />
        <div className='px-1 w-full'>
          <QuizStepper activeIndex={quizIndex + 1} limit={quizLimit} />
        </div>
        <Divider />

        <div className='flex flex-grow-[1] w-full justify-center items-center'>
          <div className='min-w-full h-fit flex flex-row flex-wrap justify-around'>
            {/* Conditional Question Cards/Boxes */}
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
              <Typography
                gutterBottom
                variant='h4'
                component='div'
                sx={{ textAlign: 'center' }}
              >
                {quizData[quizIndex].question}
              </Typography>
            </Box>
            {/* OPTIONS ARE HERE */}
            <div className='min-w-fit flex flex-col'>
              {options.map((value) => (
                <Card
                  key={value.answer}
                  onClick={() => (disableSelection ? {} : setSelected(value))}
                  sx={{
                    minWidth: 340,
                    maxWidth: 450,
                    margin: '10px 5px',
                    border:
                      selected?.answer == value.answer
                        ? '3px #1976D2 solid'
                        : ''
                  }}
                >
                  <CardActionArea disabled={disableSelection}>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant='body1'
                        component='div'
                        sx={{ fontWeight: '500', fontSize: '22px' }}
                      >
                        {value.answer}
                      </Typography>
                      <Typography
                        sx={{ display: showHint ? 'flex' : 'none' }}
                        gutterBottom
                        variant='body2'
                        component='div'
                      >
                        ({value.hint})
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Divider sx={{ marginTop: '10px' }} />
        <div className='min-w-full flex justify-center my-5'>
          <Button
            variant='contained'
            color='success'
            sx={{ width: 300, height: 50, fontSize: '1.25rem' }}
            disabled={selected == null || disableSelection}
            onClick={finished ? quizFinished : handleAnswerSubmission}
          >
            {finished ? 'Finished' : 'Check Answer'}
          </Button>
        </div>
      </div>
      {selected ? (
        <QuizAttemptOutcomeModal
          showOutcomeModal={showOutcomeModal}
          data={selected}
          isSuccess={correctAnswer}
          retry={() => {}}
          goNext={nextQuestion}
        />
      ) : null}
    </>
  )
}

export default QuizScreen
