import { useAuthModalContext } from '@/contexts/authContext'
import { useUserContext } from '@/contexts/userContext'
import { validateEmail, validatePassword } from '@/utils/utils'
import {
  Divider,
  Typography,
  Button,
  Box,
  TextField,
  LinearProgress
} from '@mui/material'
import { ReactElement } from 'react'
import Image from 'next/image'

export const ShowSignUpModal = (): ReactElement => {
  const {
    setAuthModalIsOpen,
    signUp,
    setSignUp,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    successful,
    setSuccessful,
    error,
    setError
  } = useAuthModalContext()
  const { signUpUser } = useUserContext()

  const handleFormSubmission = async () => {
    if (!(validateEmail(email) && email.length <= 256)) {
      return
    }

    setLoading(true)
    const outcome = await signUpUser({
      firstName,
      lastName,
      email,
      password,
      redirectTo: `${window.location.href}`
    })
    if (outcome != true) {
      setLoading(false)
      setError(`${outcome}`)
    } else {
      setError('')
      setLoading(false)
      setSuccessful(true)
      setEmail('')
      setPassword('')
    }
  }
  return (
    <>
      <Divider>
        <Typography variant='h5'>{'SIGN UP'}</Typography>
      </Divider>
      <div className='flex flex-col items-center m-[2%]'>
        <Image
          src={'/logo.png'}
          alt='Quick Learnings Logo'
          width={150}
          height={150}
          style={{ borderRadius: 30 }}
        />
        {error == '' ? null : (
          <Typography variant='caption' color={'error'} sx={{ marginTop: 5 }}>
            {error}
          </Typography>
        )}
      </div>
      {successful ? (
        <div className='flex flex-col items-center'>
          <Typography variant='h6'>{'Please Check your Email!'}</Typography>
          <Typography variant='body2'>
            {"We've sent you a verification email"}
          </Typography>
          <Button
            variant='contained'
            color='success'
            style={{ minWidth: 250, fontSize: 'large', margin: '50px 0' }}
            onClick={() => {
              setAuthModalIsOpen(false)
              setSuccessful(false)
              setLoading(false)
            }}
          >
            OK
          </Button>
        </div>
      ) : (
        <>
          <div className='flex flex-col p-[1%]'>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <TextField
                className='mr-2'
                id='user-first-name'
                label='First Name'
                value={firstName}
                required={signUp}
                onChange={(e) => {
                  setError('')
                  e.target.value.length > 0 && e.target.value.length <= 256
                    ? setFirstName(e.target.value)
                    : setFirstName('')
                }}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                className='ml-3'
                id='user-last-name'
                label='Last Name'
                value={lastName}
                required={signUp}
                onChange={(e) => {
                  setError('')
                  e.target.value.length > 0 && e.target.value.length <= 256
                    ? setLastName(e.target.value)
                    : setLastName('')
                }}
                sx={{ flexGrow: 1 }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexDirection: 'column'
              }}
            >
              <TextField
                className='mt-3'
                id='user-first-name-mobile'
                label='First Name'
                value={firstName}
                required={signUp}
                onChange={(e) => {
                  setError('')
                  e.target.value.length > 0 && e.target.value.length <= 256
                    ? setFirstName(e.target.value)
                    : setFirstName('')
                }}
              />
              <TextField
                className='mt-3'
                id='user-last-name-mobile'
                label='Last Name'
                value={lastName}
                required={signUp}
                onChange={(e) => {
                  setError('')
                  e.target.value.length > 0 && e.target.value.length <= 256
                    ? setLastName(e.target.value)
                    : setLastName('')
                }}
              />
            </Box>
            <TextField
              className='mt-3'
              required
              id='user-email'
              label='Email'
              type='email'
              onChange={(e) => {
                setError('')
                setEmail(e.target.value)
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
              helperText={
                signUp ? (
                  <>
                    At least one of the following: <br />
                    * number <br />
                    * uppercase letter <br />
                    * lowercase letter <br />
                    * special character
                    <br />
                    Must be between 8 and 32 characters
                  </>
                ) : (
                  ''
                )
              }
            />
          </div>
          {loading ? <LinearProgress /> : null}
          <div className='flex justify-center my-4'>
            <Button
              disabled={
                firstName == '' ||
                lastName == '' ||
                email == '' ||
                password == '' ||
                loading
              }
              variant='contained'
              color='primary'
              style={{ minWidth: 250, fontSize: 'large' }}
              onClick={handleFormSubmission}
            >
              {'Sign Up'}
            </Button>
          </div>
        </>
      )}
      <Divider />
      {successful ? (
        <></>
      ) : (
        <div className='flex justify-center'>
          <Typography variant='body2'>
            {signUp
              ? `Already have an account, let's Sign in. `
              : `New here? No problem! Let’s get you started. `}
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
      )}
    </>
  )
}
