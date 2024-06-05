'use client'
import { ReactElement } from 'react'
import SelectionCard from '@/components/SelectionCard'
import { useQuizContext } from '@/contexts/quizContext'
import { useUserContext } from '@/contexts/userContext'
import Loading from './LoadingScreen'
import { Pagination } from '@mui/material'
import WarningModal from './WarningModal'
import { useRouter } from 'next/navigation'
import { QuizView } from '@/lib/quizContracts'

export default function QuizPageComponent(): ReactElement {
  const router = useRouter()
  const { userId } = useUserContext()
  const {
    quizPageData,
    loading,
    dataCount,
    setQuizModalOpen,
    setWarningModalOpen,
    setQuizToEdit,
    quizToDelete,
    setQuizToDelete,
    closeModals,
    deleteQuizPermanently
  } = useQuizContext()
  if (loading) {
    return <Loading />
  }

  if (quizPageData.length == 0) {
    return (
      <>
        <SelectionCard
          title='No Quiz Data Found'
          description={'Use the + button to create a quiz'}
          action={() => {
            console.log('ACTION')
          }}
          created_at={''}
          created_by={''}
          deleteAction={() => {
            console.log('DELETE')
          }}
          editAction={() => {
            console.log('EDIT ACTION')
          }}
          isPublic={false}
          updatable={false}
          key={'no-quiz-data-found'}
        />
      </>
    )
  }

  return (
    <>
      <div className='mainBodyCardGridContainer'>
        {quizPageData.map((quiz: QuizView) => {
          return (
            <SelectionCard
              title={quiz.title}
              description={quiz.description}
              action={() => {
                router.push('/quiz/customise?quiz_id=' + quiz.id)
              }}
              created_at={quiz.created_at}
              created_by={quiz.firstName}
              deleteAction={() => {
                setQuizToDelete(quiz)
                setWarningModalOpen(true)
              }}
              editAction={() => {
                setQuizToEdit(quiz)
                setQuizModalOpen(true)
              }}
              isPublic={quiz.isPublic}
              updatable={userId === quiz.creatorId}
              key={'quiz-card-' + quiz.id}
              extraDetails={{
                hasTimeLimit: quiz.hasTimeLimit,
                timeInMinutes: quiz.timeLimitInMinutes,
                hasAccessibilityConstraint: quiz.hasAccessibilityConstraint,
                startTime: quiz.accessibleFrom,
                endTime: quiz.accessibleTill
              }}
            />
          )
        })}
      </div>
      {quizToDelete ? (
        <WarningModal
          message={quizToDelete?.title}
          isOpen={true}
          cancelAction={() => {
            closeModals()
          }}
          deleteAction={() => {
            deleteQuizPermanently()
          }}
        />
      ) : null}
      <div className='my-5 text-white'>
        <Pagination
          count={dataCount}
          color='primary'
          sx={{
            '& .MuiPaginationItem-text': { color: 'white' },
            '& .Mui-selected': {
              backgroundColor: 'rgb(1, 114, 111)',
              ':hover': { backgroundColor: 'rgb(1, 114, 111)' }
            }
          }}
        />
      </div>
    </>
  )
}
