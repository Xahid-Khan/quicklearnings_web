import { Modal, Box, Divider, Typography } from '@mui/material'
import { ReactElement, ReactNode, RefObject } from 'react'
import WebTitle from '@/components/WebTitle'
import CloseIcon from '@mui/icons-material/Close'

export interface BaseModalProps {
  children: ReactNode
  modalTitle: string
  isOpen: boolean
  rootRef: RefObject<HTMLDivElement>
  onClose: () => void
  hideCloseIcon?: boolean
  customHeaderMessage?: string | null
  hideDividerMessage?: boolean
  styleProps?: React.CSSProperties
}

const BaseModal = ({
  children,
  modalTitle,
  isOpen,
  rootRef,
  onClose,
  hideCloseIcon = false,
  customHeaderMessage = null,
  hideDividerMessage = false,
  styleProps = {}
}: BaseModalProps): ReactElement => {
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={isOpen}
      aria-labelledby='server-modal-title'
      aria-describedby='server-modal-description'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
        '& .MuiBackdrop-root': { minWidth: '100%' }
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
          minWidth: '350px',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          ...styleProps
        }}
      >
        <div className='flex flex-row justify-between w-full'>
          <WebTitle>{customHeaderMessage ?? 'Quick Learnings'}</WebTitle>
          {hideCloseIcon ? null : (
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
          )}
        </div>
        <Divider>
          {hideDividerMessage ? null : (
            <Typography variant='h5'>{modalTitle}</Typography>
          )}
        </Divider>
        {children}
      </Box>
    </Modal>
  )
}

export default BaseModal
