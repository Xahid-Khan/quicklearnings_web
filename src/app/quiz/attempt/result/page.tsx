'use client'
import { useAuthModalContext } from '@/contexts/authContext'
import { ReactElement, useEffect } from 'react'

const QuizResult = (): ReactElement => {
  const { setQuizStarted } = useAuthModalContext()
  useEffect(() => {
    setQuizStarted(false)
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <main className='flex min-h-screen flex-col items-center justify-center text-white'>
      <h1>Congratulation...!!!</h1>
      <p>
        {
          "This page is still under development, soon you'll be able to see your results here."
        }
      </p>
    </main>
  )
}
export default QuizResult
