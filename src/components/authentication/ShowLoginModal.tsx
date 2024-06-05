import { useAuthModalContext } from '@/contexts/authContext'
import { useUserContext } from '@/contexts/userContext'
import { validateEmail, validatePassword } from '@/utils/utils'
import {
  Divider,
  Typography,
  TextField,
  LinearProgress,
  Button
} from '@mui/material'
import { ReactElement } from 'react'
import Image from 'next/image'

export const ShowLoginModal = (): ReactElement => {
  const {
    setAuthModalIsOpen,
    signUp,
    setSignUp,
    email,
    setEmail,
    password,
    setPassword,
    setResetPassword,
    loading,
    setLoading,
    error,
    setError
  } = useAuthModalContext()
  const { signInUser } = useUserContext()

  const handleFormSubmission = async () => {
    setLoading(true)
    const outcome = await signInUser({
      email,
      password,
      redirectTo: `${window.location.href}`
    })

    if (outcome != true) {
      setError(`${outcome}`)
    } else {
      setError('')
      setEmail('')
      setPassword('')
      setAuthModalIsOpen(false)
    }
    setLoading(false)
    return
  }
  return (
    <>
      <Divider>
        <Typography variant='h5'>{'LOGIN'}</Typography>
      </Divider>
      <div className='flex flex-col items-center m-[2%]'>
        <Image
          src={'/logo.png'}
          alt='Quick Learnings Logo'
          width={150}
          height={150}
          style={{ borderRadius: 30 }}
        />
        {signUp ? null : (
          <Typography variant='body2' color={'InfoText'} sx={{ marginTop: 5 }}>
            {'"Sign in to explore our features."'}
          </Typography>
        )}
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
            disabled={loading}
          />
          <TextField
            className='mt-3'
            id='user-password'
            required
            type='password'
            label='Password'
            disabled={loading}
            onChange={(e) => {
              setError('')
              const valid = signUp
                ? validatePassword(e.target.value)
                : e.target.value.length > 8
              valid ? setPassword(e.target.value) : setPassword('')
            }}
          />
          <span className='w-full flex justify-end pt-3'>
            <Typography
              className='hover:underline cursor-pointer'
              variant='subtitle2'
              color={'blue'}
            >
              <span onClick={() => setResetPassword(true)}>Reset Password</span>
            </Typography>
          </span>
        </div>
        {loading ? <LinearProgress /> : null}
        <div className='flex justify-center my-4'>
          <Button
            disabled={email == '' || password == '' || loading}
            variant='contained'
            color='primary'
            style={{ minWidth: 250, fontSize: 'large' }}
            onClick={handleFormSubmission}
          >
            {'Log In'}
          </Button>
        </div>
      </>
      <Divider />
      <div className='flex justify-center'>
        <Typography variant='body2'>
          {`New here? No problem! Let’s get you started. `}
          {
            <Button
              onClick={() => setSignUp(!signUp)}
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
