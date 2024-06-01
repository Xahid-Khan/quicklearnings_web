'use client'
import { ReactElement, Suspense, useEffect, useState } from 'react'
import KnowledgeForm from '@/src/components/knowledge/KnowledgeForm'
import Image from 'next/image'
import { Typography } from '@mui/material'
import { useKnowledgeContext } from '@/src/contexts/knowledgeContext'
import { useSearchParams } from 'next/navigation'
import Loading from '@/src/components/LoadingScreen'

const UpdateKnowledgeSuspended = (): ReactElement => {
  const searchParams = useSearchParams()
  const editId = searchParams?.get('editId')
  const [gettingEditData, setGettingEditData] = useState<boolean>(true)

  const { getKnowledgeDataById, setKnowledgeToEdit } = useKnowledgeContext()

  useEffect(() => {
    if (editId) {
      getKnowledgeDataById(editId, setGettingEditData)
    } else {
      setKnowledgeToEdit(null)
      setGettingEditData(false)
    }
    return
  }, [editId])

  if (gettingEditData) {
    return <Loading />
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='bg-slate-300 p-4 my-5 mx-1 min-h-[80vh] flex flex-col justify-between min-w-[75%] rounded-xl'>
        <div className='flex flex-wrap flex-col justify-center items-center'>
          <Image
            src={'/logo.png'}
            alt='Quick Learning Topic Image goes here...'
            width={150}
            height={100}
            className='rounded-3xl'
          />
          <Typography>
            Keep updating your knowledge base to learn more new things, and stay
            up to date
          </Typography>
        </div>
        <KnowledgeForm />
      </div>
    </main>
  )
}

export default function UpdateKnowledge(): ReactElement {
  return (
    <Suspense fallback={<Loading />}>
      <UpdateKnowledgeSuspended />
    </Suspense>
  )
}
