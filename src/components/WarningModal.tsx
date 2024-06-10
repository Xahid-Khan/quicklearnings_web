import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import { useRef, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const WarningModal = ({
  message,
  isOpen,
  deleteAction,
  cancelAction
}: {
  message: string
  isOpen: boolean
  deleteAction: () => void
  cancelAction: () => void
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [confirmationText, setConfirmationText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleDeleteAction = (): void => {
    setLoading(true)
    deleteAction()
    return
  }

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
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: (theme) => theme.shadows[5],
          maxHeight: '100vh',
          scrollbarWidth: 'none',
          borderTop: '6px solid rgb(220, 38, 38)',
          borderRadius: '10px'
        }}
      >
        <div className='flex justify-center h-10'>
          <span className='flex bg-red-600 p-3 rounded-[100px] w-20 h-20 justify-center items-center absolute top-[-40px] left-[43%]'>
            <DeleteForeverIcon
              sx={{ color: 'white' }}
              style={{ fontSize: '50px' }}
            />
          </span>
        </div>
        <Divider>
          <Typography variant='h5'>{'DELETE PERMANENTLY ?'}</Typography>
        </Divider>
        <div className='flex flex-col p-3 justify-center items-center'>
          <div className='flex flex-col justify-center items-center py-3'>
            <Typography>{`You'll permanently loose your data:`}</Typography>
            <Typography variant='body1' className='py-2'>
              {' '}
              - {message}
            </Typography>
            <Typography>{`All the related (subsequent) data will be lost as well`}</Typography>
          </div>
          <div className='flex flex-col w-full justify-center items-center py-3 px-10'>
            {/* <Typography>{`Type "${message}" to confirm`}</Typography> */}
            <TextField
              className='mt-4 '
              required
              autoComplete='off'
              id='deletion-confirmation-field'
              placeholder={`Type "${message}" to confirm`}
              type='text'
              fullWidth
              inputProps={{ style: { textAlign: 'center' } }}
              disabled={loading}
              onChange={(e) => {
                setConfirmationText(e.target.value)
              }}
            />
          </div>
        </div>
        {loading ? <LinearProgress color='error' /> : null}
        <div className='flex flex-row flex-wrap-reverse w-full bg-gray-200 justify-around items-center p-3'>
          <Button
            className='bg-gray-600 hover:bg-gray-500 min-h-[50px] min-w-[250px] mx-5 my-3'
            variant='contained'
            onClick={cancelAction}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className='min-h-[50px] min-w-[250px] mx-5 my-3'
            variant='contained'
            color='error'
            disabled={confirmationText != message || loading}
            onClick={handleDeleteAction}
          >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default WarningModal
