import { useRef } from 'react'
import BaseModal from './BaseModal'
import { Button, Divider, Typography } from '@mui/material'
import {
  OptionsProps,
  useQuizAttemptContext
} from '@/contexts/quizAttemptContext'

const CORRECT_BG_COLOR = '#dcfce7'
const CORRECT_TEXT_COLOR = '#4d7c0f'
const WRONG_BG_COLOR = '#fecaca'
const WRONG_TEXT_COLOR = '#b91c1c'

const QuizAttemptOutcomeModal = ({
  isSuccess,
  showOutcomeModal,
  data,
  retry,
  goNext
}: {
  isSuccess: boolean
  showOutcomeModal: boolean
  data: OptionsProps
  retry: () => void
  goNext: () => void
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  return (
    <BaseModal
      isOpen={showOutcomeModal}
      customHeaderMessage={data?.answer}
      modalTitle={''}
      hideDividerMessage={true}
      onClose={() => {}}
      hideCloseIcon={true}
      rootRef={rootRef}
      key={'quiz-outcome-for-' + data?.id ?? ''}
      styleProps={{
        backgroundColor: isSuccess ? CORRECT_BG_COLOR : WRONG_BG_COLOR,
        color: isSuccess ? CORRECT_TEXT_COLOR : WRONG_TEXT_COLOR,
        maxWidth: '500px'
      }}
    >
      <div className='flex flex-col py-2'>
        <Typography className='py-2'>({data?.hint})</Typography>
        <Typography className='py-2'>{data?.question}</Typography>
      </div>
      <Divider />

      <div className='flex flex-col pt-3 items-end'>
        <Button
          variant='contained'
          color={`${isSuccess ? 'success' : 'error'}`}
          onClick={() => {
            goNext()
          }}
        >
          Next Question
        </Button>
      </div>
    </BaseModal>
  )
}

export default QuizAttemptOutcomeModal
