'use client'
import Loading from '@/src/components/LoadingScreen'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Pagination,
  SpeedDial,
  SpeedDialIcon,
  Typography
} from '@mui/material'
import SelectionCard from '@/src/components/SelectionCard'
import { QuizData } from '@/src/lib/data_types'

export default function Data({ params }: { params: { topicId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get('page')
  const currentLimit = searchParams?.get('limit')
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<QuizData[]>([])
  const [page, setPage] = useState(currentPage ?? 1)
  const [pageCount, setPageCount] = useState<number>(0)
  const [limit, setLimit] = useState(currentLimit ?? 25)
  const [expanded, setExpanded] = useState<string | false>(false)

  const fetchData = async (page: string | number) => {
    const response = await fetch(
      '/api/data/' + params.topicId + `?page=${page}&limit=${limit}`
    )
    if (response.ok) {
      const quizData = await response.json()
      setData(quizData.data)
      setPageCount(quizData.count)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentPage ?? 1)

    return
  }, [])
  if (loading) {
    return <Loading />
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => {
          //TODO:
          console.log('ADD NEW DATA')
        }}
      />
      <div
        style={{ minWidth: '75%', borderRadius: 5 }}
        className='bg-slate-300 p-5 my-5'
      >
        {data.length == 0 ? (
          <SelectionCard
            title={'NO DATA FOUND'}
            description={'CLICK HERE TO GO BACK TO HOME PAGE'}
            action={() => {
              router.push('/')
            }}
            key={'TOPIC-DATA'}
          />
        ) : (
          data.map((val: QuizData, index) => (
            <Accordion
              key={val.id}
              expanded={expanded === String(val.id)}
              onChange={handleChange(String(val.id))}
              sx={{ minWidth: '100%', margin: 0 }}
            >
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
                sx={{ backgroundColor: '#FAFAFA' }}
              >
                <Typography sx={{ minWidth: '35px', flexShrink: 0 }}>
                  {index + 1 + (Number(page) - 1) * Number(limit)}.{' '}
                </Typography>
                <Typography sx={{ width: '45%', flexShrink: 0 }}>
                  {val.question}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {val.answer}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className='bg-gray-200'>
                <span
                  className='flex flex-row float-end'
                  style={{ width: '100%', justifyContent: 'end' }}
                >
                  <Typography>{'ED'}</Typography>
                  <Typography>{'DE'}</Typography>
                </span>
                <Typography sx={{ width: '45%', flexShrink: 0 }}>
                  Q: {val.question}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  A: {val.answer}
                </Typography>
                <Typography sx={{ fontStyle: 'italic' }}>
                  Hint: {val.hint}
                </Typography>
                Notes:
                <Typography>{val.notes}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}
        <div className='w-full flex justify-center items-center my-5 pt-5'>
          <Pagination
            count={pageCount}
            page={Number(page)}
            onChange={(_, value) => {
              setPage(value)
              fetchData(value)
              router.push(
                `/data/${params.topicId}?page=${value}&limit=${limit}`,
                {
                  shallow: true
                } as any
              )
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            color='primary'
          />
        </div>
      </div>
    </main>
  )
}
