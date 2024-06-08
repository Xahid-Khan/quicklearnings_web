'use client'
import Loading from '@/components/LoadingScreen'
import { useEffect } from 'react'
import SelectionCard from '@/components/SelectionCard'
import { useRouter } from 'next/navigation'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useUserContext } from '@/contexts/userContext'
import TopicCrudModal from '@/components/topic/TopicCRUDModal'
import { useTopicContext } from '@/contexts/topicContext'
import { TopicView } from '@/lib/topicContacts'
import WarningModal from '@/components/WarningModal'
import { useAuthModalContext } from '@/contexts/authContext'
import { useSubjectContext } from '@/contexts/subjectContext'

export default function TopicPage({
  params
}: {
  params: { subjectId: string }
}) {
  const router = useRouter()
  const { userId } = useUserContext()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const subjectContext = useSubjectContext()
  const {
    setTopicModalOpen,
    setEditTopic,
    deleteTopic,
    setDeleteTopic,
    data,
    getTopicData,
    loading,
    warningModalOpen,
    setWarningModalOpen,
    deleteTopicById,
    urlSubjectId
  } = useTopicContext()

  useEffect(() => {
    getTopicData(params.subjectId)
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.subjectId, userId])

  const handleCRUDTopic = () => {
    if (userId) {
      setTopicModalOpen(true)
    } else {
      setAuthModalIsOpen(true)
    }
  }

  if (loading) {
    return <Loading />
  }

  const subjectOwner = subjectContext.data.filter(
    (item) => item.id == Number(urlSubjectId)
  )[0]?.userId

  return (
    <main className='flex min-h-[90vh] flex-row flex-wrap items-center justify-center'>
      {urlSubjectId == 'all' ||
      localStorage.getItem('subjectEditable') === 'yes' ? (
        <Fab
          color='primary'
          aria-label='add'
          sx={{ position: 'fixed', bottom: 15, right: 15 }}
          className='buttonColourDark'
          onClick={handleCRUDTopic}
        >
          <AddIcon />
        </Fab>
      ) : null}
      <TopicCrudModal />
      {deleteTopic ? (
        <WarningModal
          message={deleteTopic?.title}
          isOpen={warningModalOpen}
          cancelAction={() => {
            setWarningModalOpen(false)
            setDeleteTopic(null)
          }}
          deleteAction={() => {
            deleteTopicById()
          }}
        />
      ) : null}
      {data.length == 0 ? (
        <SelectionCard
          title={'NO DATA FOUND'}
          description={'CLICK HERE TO GO BACK TO HOME PAGE'}
          created_at=''
          created_by={null}
          updatable={false}
          action={() => {
            router.push('/')
          }}
          editAction={() => {}}
          deleteAction={() => {}}
          key={'TOPIC-DATA'}
        />
      ) : (
        data.map((val: TopicView, index) => (
          <SelectionCard
            title={val.title}
            description={val.description ?? null}
            created_at={val.created_at}
            created_by={val.firstName}
            updatable={userId != null && val.userId == userId}
            isPublic={val.isPublic}
            action={() => {
              router.push('/knowledge/' + val.id)
            }}
            editAction={() => {
              setEditTopic(val)
              setTopicModalOpen(true)
            }}
            deleteAction={() => {
              setDeleteTopic(val)
              setWarningModalOpen(true)
            }}
            key={'topic' + index}
          />
        ))
      )}
    </main>
  )
}
