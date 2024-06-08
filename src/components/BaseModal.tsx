import { Modal, Box, Divider, Typography } from '@mui/material'
import { ReactElement, ReactNode, RefObject } from 'react'
import WebTitle from '@/components/WebTitle'
import CloseIcon from '@mui/icons-material/Close'

const BaseModal = ({
  children,
  modalTitle,
  isOpen,
  rootRef,
  onClose
}: {
  children: ReactNode
  modalTitle: string
  isOpen: boolean
  rootRef: RefObject<HTMLDivElement>
  onClose: () => void
}): ReactElement => {
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={isOpen}
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
          minWidth: '360px',
          overflowY: 'scroll',
          scrollbarWidth: 'none'
        }}
      >
        <div className='flex flex-row justify-between'>
          <WebTitle>Quick Learnings</WebTitle>
          <CloseIcon
            color='error'
            onClick={onClose}
            sx={{
              position: 'relative',
              marginTop: -2,
              marginRight: -2,
              cursor: 'pointer'
            }}
          />
        </div>
        <Divider>
          <Typography variant='h5'>{modalTitle}</Typography>
        </Divider>
        {children}
      </Box>
    </Modal>
  )
}

export default BaseModal
