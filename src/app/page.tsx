'use client'
import Loading from '@/src/components/LoadingScreen'
import { useEffect, useState } from 'react'
import SelectionCard from '../components/SelectionCard'
import { useRouter } from 'next/navigation'
import { SpeedDial, SpeedDialIcon } from '@mui/material'
import { Language, Topic } from '../lib/data_types'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Language[] | Topic[]>([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/language')
      if (response.ok) {
        const languages = await response.json()
        console.log(languages)
        setData(languages)
        setLoading(false)
      }
    }
    getData()

    return
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <main className='flex min-h-[90vh] flex-col items-center justify-center'>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => {
          console.log('ADD NEW LANGUAGE')
        }}
      />
      {data.length == 0 ? (
        <SelectionCard
          title={'NO DATA FOUND'}
          description={'Click the "+" to add language'}
          action={() => {
            router.push('/')
          }}
          key={'Language-DATA'}
        />
      ) : (
        data.map((val: Language, index) => (
          <SelectionCard
            title={val.title}
            description={val.description ?? null}
            action={() => {
              router.push('/topics/' + val.id)
            }}
            key={'language' + index}
          />
        ))
      )}
    </main>
  )
}
