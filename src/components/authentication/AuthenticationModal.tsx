import {
  Modal,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  LinearProgress
} from '@mui/material'
import { ReactElement, useRef, useState } from 'react'
import { useAuthModalContext } from '../../contexts/authModal'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import WebTitle from '../WebTitle'
// import { signInUser, signUpUser } from '../app/api-client/user/useUserMutation'
import { validateEmail, validatePassword } from '../../utils/utils'
import { useUserContext } from '@/src/contexts/userContext'
import { ShowPasswordResetModal } from './ShowPasswordResetModal'
import { ShowSignUpModal } from './ShowSignUpModal'
import { ShowLoginModal } from './ShowLoginModal'

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
