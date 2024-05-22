'use client'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Divider
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthenticationModal from './authentication/AuthenticationModal'
import { useAuthModalContext } from '@/src/contexts/authModal'
import { useUserContext } from '@/src/contexts/userContext'

const NavigationBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quizStarted = searchParams?.get('quiz_started')
  const { setAuthModalIsOpen } = useAuthModalContext()
  const { userId, signOut } = useUserContext()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const pages = ['Subjects', 'Topics']
  const settings = ['Account', userId ? 'Sign Out' : 'Sign In']

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='min-w-[75%] w-full px-5'>
        <AppBar
          position='static'
          sx={{ width: '100%', backgroundColor: 'transparent' }}
        >
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                alignItems: 'center'
              }}
            >
              Quick Learnings
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <MenuItem
                  key={'quiz'}
                  onClick={() => {
                    handleCloseNavMenu()
                    router.push('/quiz')
                  }}
                >
                  {quizStarted ? null : (
                    <Button variant='contained' color='primary'>
                      <Typography textAlign='center'>{'Start Quiz'}</Typography>
                    </Button>
                  )}
                </MenuItem>
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu()
                      const route =
                        page == 'Subjects' ? '' : `${page.toLowerCase()}/0`
                      router.push('/' + route)
                    }}
                  >
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
                <MenuItem
                  key={'account'}
                  onClick={() => {
                    handleCloseNavMenu()
                    userId ? router.push('/') : setAuthModalIsOpen(true)
                  }}
                >
                  <Typography textAlign='center'>{'Account'}</Typography>
                </MenuItem>
                {userId ? (
                  <>
                    <Divider />
                    <MenuItem
                      key={'log-out'}
                      onClick={() => {
                        signOut()
                        router.push('/')
                      }}
                    >
                      <Typography textAlign='center'>{'Log out'}</Typography>
                    </MenuItem>
                  </>
                ) : null}
              </Menu>
            </Box>
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Quick Learnings
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu()
                    const route =
                      page == 'Subjects' ? '' : `${page.toLowerCase()}/all`
                    router.push('/' + route)
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {quizStarted ? null : (
              <Box sx={{ flexGrow: 0.25, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  key={'QuizPage'}
                  onClick={() => {
                    handleCloseNavMenu()
                    router.push('/quiz')
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  variant='contained'
                  color={`${quizStarted ? 'error' : 'primary'}`}
                >
                  Start Quiz
                </Button>
              </Box>
            )}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/logo.png' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting == 'Sign Out') {
                        signOut()
                      } else if (setting == 'Sign In') {
                        setAuthModalIsOpen(true)
                      }
                      handleCloseUserMenu()
                    }}
                  >
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      <AuthenticationModal />
    </div>
  )
}

export default NavigationBar
