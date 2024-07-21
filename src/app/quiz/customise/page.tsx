'use client'
import QuizPageComponent from '@/components/QuizPageComponent'
import { useAuthModalContext } from '@/contexts/authContext'
import { useQuizContext } from '@/contexts/quizContext'
import { useUserContext } from '@/contexts/userContext'
import { Fab } from '@mui/material'
import { ReactElement } from 'react'
import AddIcon from '@mui/icons-material/Add'
import QuizCrudModal from '@/components/quiz/QuizCrudModal'
import QuizDataCrudModal from '@/components/quiz/QuizDataCrudModal'

export default function QuizCustomisationPage(): ReactElement {
  const handleAddNewQuizData = () => {
    console.log('ADD NEW QUIZ DATA')
  }

  return (
    <main className='flex min-h-[80vh] flex-col justify-center items-center'>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'fixed', bottom: 15, right: 15 }}
        className='buttonColourDark'
        onClick={handleAddNewQuizData}
      >
        <AddIcon />
      </Fab>
      <QuizDataCrudModal />
    </main>
  )
}
