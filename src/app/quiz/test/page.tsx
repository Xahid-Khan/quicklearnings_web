'use client'
import Loading from '@/components/LoadingScreen'
import QuizScreen from '@/components/Quiz'
import QuizOptions from '@/components/QuizOptions'
import { useAuthModalContext } from '@/contexts/authContext'
import { useUserContext } from '@/contexts/userContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

const DynamicQuiz = () => {
  const { userId } = useUserContext()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const quizStarted = searchParams?.get('quiz_started')
  const subjectIdParam = searchParams?.get('subjectId')
  const topicIdParam = searchParams?.get('topicId')
  const limitParam = searchParams?.get('limit')
  const [subjectId, setSubjectId] = useState<number | string | null>(
    subjectIdParam ?? null
  )
  const [topicId, setTopicId] = useState<number | string | null>(
    topicIdParam ?? null
  )
  const [limit, setLimit] = useState<number | string | null>(limitParam ?? null)
  const [startQuiz, setStartQuiz] = useState<boolean>(
    quizStarted ? Boolean(quizStarted) : false
  )

  const handleStartQuizButton = () => {
    if (userId) {
      router.push(
        `/quiz/test?quiz_started=true&subjectId=${subjectId}&topicId=${topicId}&limit=${limit}`
      )
      setStartQuiz(true)
    } else {
      setAuthModalIsOpen(true)
    }
  }
  return (
    <main className='flex min-h-[90vh] flex-col items-center justify-center'>
      {startQuiz && subjectId != null && topicId != null && limit != null ? (
        <QuizScreen subjectId={subjectId} topicId={topicId} limit={limit} />
      ) : (
        <QuizOptions
          subjectId={subjectId}
          setSubjectId={setSubjectId}
          topicId={topicId}
          setTopicId={setTopicId}
          limit={limit}
          setLimit={setLimit}
          handleStartQuizButton={handleStartQuizButton}
        />
      )}
    </main>
  )
}

const Quiz = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DynamicQuiz />
    </Suspense>
  )
}

export default Quiz
