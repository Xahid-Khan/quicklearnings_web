'use client'
import Loading from '@/src/components/LoadingScreen'
import { useEffect, useState } from 'react'
import SelectionCard from '@/src/components/SelectionCard'
import { useRouter } from 'next/navigation'
import { SpeedDial, SpeedDialIcon } from '@mui/material'
import { Language, Topic } from '@/src/lib/data_types'

export default function TopicPage({
  params
}: {
  params: { languageId: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Language[] | Topic[]>([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/topic/' + params.languageId)
      if (response.ok) {
        const topics = await response.json()
        setData(topics)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }
    }
    getData()

    return
  }, [params.languageId])

  if (loading) {
    return <Loading />
  }

  return (
    <main className='flex min-h-[90vh] flex-row flex-wrap items-center justify-center'>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => {
          console.log('ADD NEW TOPIC')
        }}
      />
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
        data.map((val: Language, index) => (
          <SelectionCard
            title={val.title}
            description={val.description ?? null}
            action={() => {
              router.push('/data/' + val.id)
            }}
            key={'language' + index}
          />
        ))
      )}
    </main>
  )
}
