import { Modal, Box } from '@mui/material'
import WebTitle from '@/src/components/WebTitle'
import { useSubjectContext } from '@/src/contexts/subjectContext'
import CloseIcon from '@mui/icons-material/Close'
import { useRef } from 'react'
import { AddSubject } from './AddEditSubject'

const SubjectCrudModal = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const { subjectModalOpen, closeModal } = useSubjectContext()
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={subjectModalOpen}
      aria-labelledby='server-modal-title'
      aria-describedby='server-modal-description'
      sx={{
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350
      }}
      container={() => rootRef.current!}
    >
      <Box
        sx={{
          position: 'relative',
          flexGrow: 0.25,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: (theme) => theme.shadows[5],
          p: 3,
          maxHeight: '100vh',
          overflowY: 'scroll',
          scrollbarWidth: 'none'
        }}
      >
        <div className='flex flex-row justify-between'>
          <WebTitle>Quick Learnings</WebTitle>
          <CloseIcon
            color='error'
            onClick={() => {
              closeModal()
            }}
            sx={{
              position: 'relative',
              marginTop: -2,
              marginRight: -2,
              cursor: 'pointer'
            }}
          />
        </div>
        <AddSubject />
      </Box>
    </Modal>
  )
}

export default SubjectCrudModal
