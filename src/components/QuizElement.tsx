import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

interface QuizElementProps {
  question: string
  options: { answer: string; hint: string }[]
  selected: string
  setSelected: (val: string) => void
}
const QuizElement = ({
  question,
  options,
  selected,
  setSelected
}: QuizElementProps) => {
  return (
    <div className='min-w-full min-h-full flex flex-row flex-wrap justify-around'>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Card sx={{ minWidth: 340, maxWidth: 450 }}>
          <CardActionArea>
            <Image
              src={'/TopicBG.png'}
              alt='Quick Learning BG LOGO IMAGE'
              width={450}
              height={300}
              priority
            />
            <CardContent>
              <Typography gutterBottom variant='h4' component='div'>
                {question}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Typography gutterBottom variant='h4' component='div'>
          {question}
        </Typography>
      </Box>
      <div className='min-w-fit flex flex-col'>
        {options.map((value) => (
          <Card
            key={value.answer}
            onClick={() => setSelected(value.answer)}
            sx={{
              minWidth: 340,
              maxWidth: 450,
              margin: '10px 5px',
              border: selected == value.answer ? '3px #1976D2 solid' : ''
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {value.answer}
                </Typography>
                <Typography gutterBottom variant='body2' component='div'>
                  ({value.hint})
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default QuizElement
