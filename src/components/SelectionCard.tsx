import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import Card from '@mui/material/Card'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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
  deleteAction
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
        <CardContent className='relative'>
          {isPublic != null ? (
            <span
              className={`${
                isPublic
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-green-100 text-green-700'
              } rounded absolute top-[-25px] right-1`}
            >
              <Typography variant='caption' className='p-3'>
                {isPublic ? 'Public' : 'Private'}
              </Typography>
            </span>
          ) : null}
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
          <span className='flex flex-row flex-wrap justify-between'>
            <Typography
              variant='caption'
              className='px-1 rounded bg-gray-200 text-gray-600'
            >
              {new Date(created_at).toDateString()}
            </Typography>
            <Typography
              variant='caption'
              className={`px-1 rounded  ${
                created_by
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              By {created_by ? created_by : 'Anonymous'}
            </Typography>
          </span>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default SelectionCard
