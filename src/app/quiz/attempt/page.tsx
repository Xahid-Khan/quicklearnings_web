'use client'
import Loading from '@/components/LoadingScreen'
import QuizScreen from '@/components/Quiz'
import { useAuthModalContext } from '@/contexts/authContext'
import { useEffect, useState } from 'react'

interface QuizOptions {
  startTime: string
  quizType: string
  subjectId: string
  topicId: string
  limit: string
}

const DynamicQuiz = () => {
  const { setQuizStarted } = useAuthModalContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [quizOptions, setQuizOptions] = useState<QuizOptions | null>(null)

  useEffect(() => {
    const localQuizData = localStorage.getItem('quiz_started')
    if (localQuizData) {
      setQuizOptions(JSON.parse(localQuizData))
      setQuizStarted(true)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <main className='flex min-h-[90vh] flex-col items-center justify-center'>
      {quizOptions ? (
        <QuizScreen
          subjectId={quizOptions.subjectId}
          topicId={quizOptions.topicId}
          limit={quizOptions.limit}
          quizType={quizOptions.quizType}
        />
      ) : (
        <>
          <h1 className='text-white'>TRY AGAIN !!!</h1>
        </>
      )}
    </main>
  )
}

const Quiz = () => {
  return <DynamicQuiz />
}

export default Quiz
