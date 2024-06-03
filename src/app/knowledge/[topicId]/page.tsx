'use client'
import Loading from '@/src/components/LoadingScreen'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fab,
  Pagination,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SelectionCard from '@/src/components/SelectionCard'
import { QuizData } from '@/src/lib/data_types'
import { useKnowledgeContext } from '@/src/contexts/knowledgeContext'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import WarningModal from '@/src/components/WarningModal'
import { useUserContext } from '@/src/contexts/userContext'
import { useAuthModalContext } from '@/src/contexts/authContext'
import KnowledgeCrudModal from '@/src/components/knowledge/KnowledgeCRUDModal'
import { Knowledge } from '@/src/lib/knowledgeContracts'

const ShowTopicDetails = () => {
  const { topicDetails } = useKnowledgeContext()
  return (
    <>
      <table className='mb-3'>
        <tbody>
          <tr>
            <td>Topic:</td>
            <td>
              <Typography>{topicDetails?.title}</Typography>
            </td>
          </tr>
          <tr>
            <td className='flex'>Description:</td>
            <td className='text-justify'>
              <Typography>{topicDetails?.description}</Typography>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className='flex justify-end'>
              <TextField label='Search... - Coming Soon' disabled />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const GetDataAccordion = ({
  fetchData
}: {
  fetchData: (page: number) => void
}) => {
  const router = useRouter()
  const { userId } = useUserContext()
  const {
    data,
    topicId,
    expanded,
    setExpanded,
    page,
    limit,
    setKnowledgeToDelete,
    setKnowledgeToEdit,
    knowledgeToDelete,
    warningModalOpen,
    setWarningModalOpen,
    closeModal,
    deleteKnowledgeById,
    setKnowledgeModalOpen
  } = useKnowledgeContext()

  useEffect(() => {
    fetchData(page)
    return
  }, [topicId])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <>
      {knowledgeToDelete ? (
        <WarningModal
          key={'knowledgeDeletionModal'}
          isOpen={warningModalOpen}
          message={
            knowledgeToDelete.prompt.length > 25
              ? knowledgeToDelete.prompt.slice(0, 25) + '...'
              : knowledgeToDelete.prompt
          }
          cancelAction={closeModal}
          deleteAction={() => {
            deleteKnowledgeById()
          }}
        />
      ) : null}
      {data.length == 0 ? (
        <div className='w-full flex justify-center'>
          <SelectionCard
            title={'NO DATA FOUND'}
            description={'CLICK HERE TO GO BACK TO HOME PAGE'}
            action={() => {
              router.push('/')
            }}
            key={'TOPIC-DATA'}
            created_at={''}
            created_by={null}
            updatable={false}
            editAction={() => {}}
            deleteAction={() => {}}
          />
        </div>
      ) : (
        data.map((val: Knowledge, index: number) => (
          <Accordion
            key={val.id}
            expanded={expanded === String(val.id)}
            onChange={handleChange(String(val.id))}
            sx={{
              minWidth: '100%',
              margin: 0,
              '&.Mui-expanded': { margin: '1px 0' }
            }}
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
                {val.prompt}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {val.solution}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className='bg-gray-200'>
              <span
                className='flex flex-row float-end'
                style={{ width: '100%', justifyContent: 'end' }}
              >
                {userId && userId == val.userId ? (
                  <>
                    <BorderColorIcon
                      className='cursor-pointer mx-1'
                      fontSize='small'
                      color='primary'
                      onClick={() => {
                        setKnowledgeToEdit(val)
                        setKnowledgeModalOpen(true)
                      }}
                    />
                    <DeleteForeverIcon
                      className='cursor-pointer ml-1'
                      fontSize='small'
                      color='error'
                      onClick={() => {
                        setKnowledgeToDelete(val)
                        setWarningModalOpen(true)
                      }}
                    />
                  </>
                ) : null}
              </span>
              <Typography sx={{ width: '45%', flexShrink: 0 }}>
                Q: {val.prompt}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                A: {val.solution}
              </Typography>
              <Typography sx={{ fontStyle: 'italic' }}>
                Hint: {val.hint}
              </Typography>
              Notes:
              <Typography style={{ whiteSpace: 'pre-line' }}>
                {val.notes}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  )
}

export default function KnowledgePage({
  params
}: {
  params: { topicId: string }
}) {
  const router = useRouter()
  const { userId } = useUserContext()
  const { setAuthModalIsOpen } = useAuthModalContext()
  const {
    setTopicId,
    loading,
    page,
    setPage,
    pageCount,
    limit,
    fetchData,
    setKnowledgeModalOpen
  } = useKnowledgeContext()

  useEffect(() => {
    setTopicId(Number(params.topicId))
  }, [params.topicId, setTopicId])

  if (loading) {
    return <Loading />
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <Fab
        color='primary'
        aria-label='add'
        sx={{ position: 'fixed', bottom: 15, right: 15 }}
        className='buttonColourDark'
        onClick={() => {
          if (userId) {
            setKnowledgeModalOpen(true)
          } else {
            setAuthModalIsOpen(true)
          }
        }}
      >
        <AddIcon />
      </Fab>
      <div
        style={{ minWidth: '75%', borderRadius: 5 }}
        className='bg-slate-300 p-5 my-5 min-h-[80vh] flex flex-col justify-between'
      >
        <div className='flex flex-col'>
          <ShowTopicDetails />
          <GetDataAccordion fetchData={fetchData} />
        </div>
        <KnowledgeCrudModal />
        <div className='w-full flex justify-center items-center my-5 pt-5'>
          <Pagination
            count={pageCount}
            page={Number(page)}
            onChange={(_, value) => {
              setPage(value)
              fetchData()
              router.push(
                `/knowledge/${params.topicId}?page=${value}&limit=${limit}`,
                {
                  shallow: true
                } as any
              )
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            sx={{
              '& .Mui-selected': { backgroundColor: '#01726f', color: 'white' }
            }}
          />
        </div>
      </div>
    </main>
  )
}
