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
  Avatar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthenticationModal from './authentication/AuthenticationModal'
import { useAuthModalContext } from '@/contexts/authContext'
import { useUserContext } from '@/contexts/userContext'

const MobileNavigation = ({
  anchorElNav,
  pages,
  settings,
  handleNavAction,
  handleOpenNavMenu,
  handleCloseNavMenu
}: {
  anchorElNav: HTMLElement | null
  pages: string[]
  settings: string[]
  handleNavAction: (selection: string) => void
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseNavMenu: () => void
}) => {
  const router = useRouter()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const { userId } = useUserContext()

  return (
    <>
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
            if (userId) {
              router.push('/quiz/test')
            } else {
              setAuthModalIsOpen(true)
            }
          }}
        >
          <Button variant='contained' className={'buttonColourDark'}>
            <Typography textAlign='center'>{'Start Quiz'}</Typography>
          </Button>
        </MenuItem>
        {pages.concat(settings).map((page) => (
          <MenuItem
            key={page}
            onClick={() => {
              handleCloseNavMenu()
              handleNavAction(page)
            }}
          >
            <Typography textAlign='center'>{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const DesktopNavigation = ({
  anchorElUser,
  pages,
  settings,
  handleNavAction,
  handleOpenUserMenu,
  handleCloseUserMenu
}: {
  anchorElUser: HTMLElement | null
  pages: string[]
  settings: string[]
  handleNavAction: (selection: string) => void
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
}) => {
  const router = useRouter()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const { userId } = useUserContext()

  return (
    <>
      <Typography
        variant='h6'
        noWrap
        component='a'
        href='/'
        sx={{
          mr: 4,
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
      <div className='flex flex-row justify-between flex-grow'>
        <div className='flex flex-row'>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => {
                handleNavAction(page)
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </div>
        <div>
          <Button
            key={'QuizPage'}
            onClick={() => {
              if (userId) {
                router.push('/quiz/test')
              } else {
                setAuthModalIsOpen(true)
              }
            }}
            sx={{ my: 2, color: 'white', display: 'block' }}
            variant='contained'
            color={'primary'}
            className='buttonColourDark'
          >
            Start Quiz
          </Button>
        </div>
        <div className='flex flex-row'>
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
                  handleCloseUserMenu()
                  handleNavAction(setting)
                }}
              >
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </>
  )
}

const NavigationBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quizStarted = searchParams?.get('quiz_started')
  const { setAuthModalIsOpen } = useAuthModalContext()
  const { userId, signOut } = useUserContext()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const pages = ['Subjects', 'Topics', 'Quiz']
  const settings = userId ? ['Account', 'Log Out'] : ['Sign In']

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleNavAction = (selection: string) => {
    if (selection === 'Subjects') {
      router.push('/')
    } else if (selection === 'Topics') {
      const route = `${selection.toLowerCase()}/all`
      router.push('/' + route)
    } else if (selection === 'Account') {
      userId ? router.push('/account') : setAuthModalIsOpen(true)
    } else if (selection === 'Quiz') {
      router.push('/quiz')
    } else if (selection === 'Log Out') {
      signOut()
      router.push('/')
    } else if (selection === 'Sign In') {
      setAuthModalIsOpen(true)
    }
  }

  return (
    <div className='w-full flex justify-center'>
      <div
        className='min-w-[75%] w-full px-5'
        style={{ display: quizStarted ? 'none' : 'flex' }}
      >
        <AppBar
          position='static'
          sx={{ width: '100%', backgroundColor: 'transparent' }}
        >
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <MobileNavigation
                anchorElNav={anchorElNav}
                pages={pages}
                settings={settings}
                handleNavAction={handleNavAction}
                handleCloseNavMenu={handleCloseNavMenu}
                handleOpenNavMenu={handleOpenNavMenu}
              />
            </Box>
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='/'
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
              <DesktopNavigation
                anchorElUser={anchorElUser}
                pages={pages}
                settings={settings}
                handleCloseUserMenu={handleCloseUserMenu}
                handleNavAction={handleNavAction}
                handleOpenUserMenu={handleOpenUserMenu}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      <AuthenticationModal />
    </div>
  )
}

export default NavigationBar
