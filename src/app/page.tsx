'use client'
import Loading from '@/src/components/LoadingScreen'
import { useEffect, useState } from 'react'
import SelectionCard from '../components/SelectionCard'
import { useRouter } from 'next/navigation'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { Subject, Topic } from '../lib/data_types'
import { useAuthModalContext } from '../contexts/authModal'

export default function Home() {
  const router = useRouter()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Subject[] | Topic[]>([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/subject')
      if (response.ok) {
        const subjects = await response.json()
        console.log(subjects)
        setData(subjects)
        setLoading(false)
      }
    }
    getData()

    return
  }, [])

  if (loading) {
    return <Loading />
  }

  const handleAddSubject = () => {
    setAuthModalIsOpen(true)
  }

  return (
    <main className='flex min-h-[90vh] flex-col items-center justify-center'>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'fixed', bottom: 15, right: 15 }}
        onClick={handleAddSubject}
      >
        <AddIcon />
      </Fab>
      {data.length == 0 ? (
        <SelectionCard
          title={'NO DATA FOUND'}
          description={'Click the "+" to add Subject'}
          action={() => {
            router.push('/')
          }}
          key={'Subject-DATA'}
        />
      ) : (
        data.map((val: Subject, index) => (
          <SelectionCard
            title={val.title}
            description={val.description ?? null}
            action={() => {
              router.push('/topics/' + val.id)
            }}
            key={'subject' + index}
          />
        ))
      )}
    </main>
  )
}
