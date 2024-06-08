'use client'
import QuizPageComponent from '@/components/QuizPageComponent'
import { useAuthModalContext } from '@/contexts/authContext'
import { useQuizContext } from '@/contexts/quizContext'
import { useUserContext } from '@/contexts/userContext'
import { Fab } from '@mui/material'
import { ReactElement } from 'react'
import AddIcon from '@mui/icons-material/Add'
import QuizCrudModal from '@/components/quiz/QuizCrudModal'

export default function QuizPage(): ReactElement {
  const { userId } = useUserContext()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const { setQuizModalOpen } = useQuizContext()
  return (
    <main className='flex min-h-[90vh] flex-col items-center justify-around'>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'fixed', bottom: 15, right: 15 }}
        className='buttonColourDark'
        onClick={() => {
          if (userId) {
            setQuizModalOpen(true)
          } else {
            setAuthModalIsOpen(true)
          }
        }}
      >
        <AddIcon />
      </Fab>
      <QuizCrudModal />
      <QuizPageComponent />
    </main>
  )
}
