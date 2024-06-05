'use client'
import Loading from '@/components/LoadingScreen'
import SelectionCard from '@/components/SelectionCard'
import { useRouter } from 'next/navigation'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { useSubjectContext } from '@/contexts/subjectContext'
import SubjectCrudModal from '@/components/subject/SubjectCRUDModal'
import { Subject } from '@/lib/subjectContracts'
import { useUserContext } from '@/contexts/userContext'
import WarningModal from '@/components/WarningModal'
import { useAuthModalContext } from '../contexts/authContext'

export default function Home() {
  const { userId } = useUserContext()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const router = useRouter()
  const {
    setSubjectModalOpen,
    data,
    loading,
    setEditSubject,
    deleteSubjectById,
    setWarningModalOpen,
    warningModalOpen,
    deleteSubject,
    setDeleteSubject
  } = useSubjectContext()

  if (loading) {
    return <Loading />
  }

  const handleAddSubject = () => {
    if (userId) {
      setSubjectModalOpen(true)
    } else {
      setAuthModalIsOpen(true)
    }
  }

  return (
    <main className='flex min-h-[90vh] flex-row flex-wrap items-center justify-center'>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'fixed', bottom: 15, right: 15 }}
        className='buttonColourDark'
        onClick={handleAddSubject}
      >
        <AddIcon />
      </Fab>
      <SubjectCrudModal />
      {deleteSubject ? (
        <WarningModal
          message={deleteSubject.title}
          isOpen={warningModalOpen}
          cancelAction={() => {
            setWarningModalOpen(false)
            setDeleteSubject(null)
          }}
          deleteAction={() => {
            deleteSubjectById()
          }}
        />
      ) : null}
      {data.length == 0 ? (
        <SelectionCard
          title={'NO DATA FOUND'}
          description={'Click the "+" to add Subject'}
          created_at=''
          created_by={null}
          updatable={false}
          action={() => {
            router.push('/')
          }}
          editAction={() => {}}
          deleteAction={() => {}}
          key={'Subject-DATA'}
        />
      ) : (
        data.map((val: Subject, index) => (
          <SelectionCard
            title={val.title}
            description={val.description ?? null}
            created_at={val.created_at}
            created_by={val.firstName}
            updatable={userId != null && val.userId == userId}
            isPublic={val.isPublic}
            action={() => {
              localStorage.setItem(
                'subjectEditable',
                val.userId == userId ? 'yes' : 'no'
              )
              router.push('/topics/' + val.id)
            }}
            editAction={() => {
              setEditSubject(val)
              handleAddSubject()
            }}
            deleteAction={() => {
              setDeleteSubject(val)
              setWarningModalOpen(true)
            }}
            key={'subject' + index}
          />
        ))
      )}
    </main>
  )
}
