import {
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip,
  Typography
} from '@mui/material'
import Card from '@mui/material/Card'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import PublicOffOutlinedIcon from '@mui/icons-material/PublicOffOutlined'

interface SelectionCardProps {
  title: string
  description: string | null
  created_at: string
  created_by: string | null
  updatable: boolean
  isPublic?: boolean | null
  action: () => void
  editAction: () => void
  deleteAction: () => void
  extraDetails?: { [key: string]: string | boolean | number }
}

const SelectionCard = ({
  title,
  description,
  created_at,
  created_by,
  updatable,
  isPublic,
  action,
  editAction,
  deleteAction,
  extraDetails = {}
}: SelectionCardProps) => {
  return (
    <Card sx={{ width: 340, margin: '10px' }} className='relative'>
      {updatable ? (
        <span className='absolute flex flex-col justify-between top-0 right-0 z-10 bg-white bg-opacity-75 rounded min-w-[20px]'>
          <BorderColorIcon
            color='primary'
            fontSize='medium'
            className='cursor-pointer'
            onClick={editAction}
          />
          <DeleteForeverIcon
            color='error'
            fontSize='medium'
            className='cursor-pointer mt-3'
            onClick={deleteAction}
          />
        </span>
      ) : null}
      <CardActionArea onClick={action}>
        <CardMedia
          component={'img'}
          width={250}
          image='/TopicBG.png'
          alt='Missing Topic Background Image...'
        />
      </CardActionArea>
      <CardContent className='relative'>
        {
          <div className='absolute top-[-25px] right-1 z-10'>
            {extraDetails.hasTimeLimit ? (
              <span
                className={`${
                  extraDetails.hasTimeLimit
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                } rounded m-1 p-1`}
              >
                <TimerOutlinedIcon />
                <Typography variant='caption'>
                  {extraDetails.timeInMinutes + ' Minutes'}
                </Typography>
              </span>
            ) : null}

            <span
              className={`${
                isPublic
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-blue-100 text-blue-700'
              } rounded m-1 p-1`}
            >
              {isPublic ? <PublicOutlinedIcon /> : <PublicOffOutlinedIcon />}
              <Typography variant='caption'>
                {isPublic ? 'Public' : 'Private'}
              </Typography>
            </span>

            {extraDetails.hasAccessibilityConstraint ? (
              <span
                className={`${
                  extraDetails.hasAccessibilityConstraint
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                } rounded m-1 p-1`}
              >
                <Tooltip
                  title={
                    <Typography variant='caption'>
                      <table>
                        <tbody>
                          <tr>
                            <td className='min-w-14'>Start At: </td>
                            <td>
                              {new Date(
                                String(extraDetails.startTime)
                              ).toDateString()}{' '}
                              {new Date(
                                String(extraDetails.startTime)
                              ).toTimeString()}
                            </td>
                          </tr>
                          <tr className='border-t-2'>
                            <td>Ends At: </td>
                            <td>
                              {new Date(
                                String(extraDetails.endTime)
                              ).toDateString()}
                              {new Date(
                                String(extraDetails.endTime)
                              ).toTimeString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Typography>
                  }
                >
                  <CalendarMonthOutlinedIcon />
                </Tooltip>
              </span>
            ) : null}
          </div>
        }

        <CardActionArea onClick={action}>
          <Typography
            gutterBottom
            variant='h5'
            component={'div'}
            className='text-nowrap overflow-hidden'
          >
            {title}
          </Typography>
          <Typography
            variant='body2'
            color={'text.secondary'}
            style={{ height: 80, overflow: 'hidden' }}
          >
            {description && description !== ''
              ? description
              : 'No description provided...'}
          </Typography>
        </CardActionArea>
        <span className='flex flex-row flex-wrap justify-between'>
          <Typography
            variant='caption'
            className='px-1 rounded bg-gray-200 text-gray-600'
          >
            {created_at ? new Date(created_at).toDateString() : ''}
          </Typography>
          <Typography
            variant='caption'
            className={`px-1 rounded  ${
              created_by
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {created_by ? 'By ' + created_by : ''}
          </Typography>
        </span>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  )
}

export default SelectionCard
