import { useAuthModalContext } from '@/src/contexts/authModal'
import { useUserContext } from '@/src/contexts/userContext'
import { validateEmail } from '@/src/utils/utils'
import Image from 'next/image'
import {
  Divider,
  Typography,
  TextField,
  LinearProgress,
  Button
} from '@mui/material'
import { ReactElement } from 'react'

export const ShowPasswordResetModal = (): ReactElement => {
  const {
    setAuthModalIsOpen,
    email,
    setEmail,
    setResetPassword,
    loading,
    setLoading,
    successful,
    setSuccessful,
    error,
    setError
  } = useAuthModalContext()
  const { resetUserPassword } = useUserContext()

  const handleFormSubmission = async (): Promise<void> => {
    setLoading(true)
    const outcome = await resetUserPassword({
      email,
      redirectTo: `${window.location.href}`
    })
    if (outcome == true) {
      setSuccessful(true)
    }

    setLoading(false)
  }

  return (
    <>
      <Divider>
        <Typography variant='h5'>{'RESET PASSWORD'}</Typography>
      </Divider>
      <div className='flex flex-col items-center m-[2%]'>
        <Image
          src={'/logo.png'}
          alt='Quick Learnings Logo'
          width={150}
          height={150}
          style={{ borderRadius: 30 }}
        />
        <Typography variant='body2' color={'InfoText'} sx={{ marginTop: 5 }}>
          {successful ? (
            <span className='bg-green-100 text-green-700 p-2 rounded'>
              {`Reset instructions has been sent to ${email}`}
            </span>
          ) : (
            'Enter your registered email'
          )}
        </Typography>
        {error == '' ? null : (
          <Typography variant='caption' color={'error'} sx={{ marginTop: 5 }}>
            {error}
          </Typography>
        )}
      </div>
      <>
        <div className='flex flex-col p-[1%]'>
          <TextField
            className='mt-3'
            required
            id='user-email'
            label='Email'
            type='email'
            onChange={(e) => {
              setError('')
              validateEmail(e.target.value) && e.target.value.length <= 256
                ? setEmail(e.target.value)
                : setEmail('')
            }}
            disabled={loading || successful}
          />
        </div>
        {loading ? <LinearProgress /> : null}
        <div className='flex justify-center my-4'>
          <Button
            disabled={email == '' || loading || successful}
            variant='contained'
            color='primary'
            style={{ minWidth: 250, fontSize: 'large' }}
            onClick={handleFormSubmission}
          >
            {'Request Reset'}
          </Button>
        </div>
      </>
      <Divider />
      <div className='flex justify-center'>
        <Typography variant='body2'>
          {`To go back to login screen `}
          {
            <Button
              onClick={() => setResetPassword(false)}
              style={{
                cursor: 'pointer',
                color: '#1976D2',
                padding: 0,
                letterSpacing: 0,
                fontWeight: 'bold',
                textTransform: 'unset'
              }}
              variant='text'
            >
              {'Click here'}
            </Button>
          }
        </Typography>
      </div>
    </>
  )
}
