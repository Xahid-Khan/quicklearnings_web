import { Modal, Box } from '@mui/material'
import { useRef } from 'react'
import { useAuthModalContext } from '@/src/contexts/authContext'
import CloseIcon from '@mui/icons-material/Close'
import WebTitle from '@/src/components/WebTitle'
import { ShowPasswordResetModal } from '@/src/components/authentication/ShowPasswordResetModal'
import { ShowSignUpModal } from '@/src/components/authentication/ShowSignUpModal'
import { ShowLoginModal } from '@/src/components/authentication/ShowLoginModal'

const AuthenticationModal = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const {
    authModalOpen,
    signUp,
    resetPassword,
    setAuthModalIsOpen,
    setLoading,
    setResetPassword
  } = useAuthModalContext()

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={authModalOpen}
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
              setAuthModalIsOpen(false)
              setResetPassword(false)
              setLoading(false)
            }}
            sx={{
              position: 'relative',
              marginTop: -2,
              marginRight: -2,
              cursor: 'pointer'
            }}
          />
        </div>
        {resetPassword
          ? ShowPasswordResetModal()
          : signUp
          ? ShowSignUpModal()
          : ShowLoginModal()}
      </Box>
    </Modal>
  )
}

export default AuthenticationModal
