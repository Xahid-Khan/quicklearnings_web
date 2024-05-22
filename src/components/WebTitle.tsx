import { Typography } from '@mui/material'
import { ReactNode } from 'react'

const WebTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Typography
      variant='h6'
      noWrap
      component='a'
      href='/'
      sx={{
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        color: 'inherit',
        textDecoration: 'none',
        alignItems: 'center'
      }}
    >
      {children}
    </Typography>
  )
}

export default WebTitle
