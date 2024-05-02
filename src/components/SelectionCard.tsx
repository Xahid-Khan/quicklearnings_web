import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import Card from '@mui/material/Card'

interface SelectionCardProps {
  title: string
  description: string | null
  action: () => void
}

const SelectionCard = ({ title, description, action }: SelectionCardProps) => {
  return (
    <Card sx={{ width: 340, margin: '10px' }}>
      <CardActionArea onClick={action}>
        <CardMedia
          component={'img'}
          width={250}
          image='/TopicBG.png'
          alt='Missing Topic Background Image...'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component={'div'}>
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
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default SelectionCard
