'use client'
import Loading from '@/src/components/LoadingScreen'
import QuizScreen from '@/src/components/Quiz'
import QuizOptions from '@/src/components/QuizOptions'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

const DynamicQuiz = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quizStarted = searchParams?.get('quiz_started')
  const subjectIdParam = searchParams?.get('subjectId')
  const topicIdParam = searchParams?.get('topicId')
  const limitParam = searchParams?.get('limit')
  const [subjectId, setSubjectId] = useState<number | string>(
    subjectIdParam ?? 0
  )
  const [topicId, setTopicId] = useState<number | string>(topicIdParam ?? 0)
  const [limit, setLimit] = useState<number | string>(limitParam ?? 30)
  const [startQuiz, setStartQuiz] = useState<boolean>(
    quizStarted ? Boolean(quizStarted) : false
  )

  const handleStartQuizButton = () => {
    router.push(
      `/quiz?quiz_started=true&subjectId=${subjectId}&topicId=${topicId}&limit=${limit}`
    )
    setStartQuiz(true)
  }
  return (
    <main className='flex min-h-[90vh] flex-col items-center justify-center'>
      {startQuiz ? (
        <QuizScreen subjectId={subjectId} topicId={topicId} limit={limit} />
      ) : (
        <QuizOptions
          setSubjectId={setSubjectId}
          setTopicId={setTopicId}
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
