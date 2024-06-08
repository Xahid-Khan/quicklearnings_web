import { useQuizContext } from '@/contexts/quizContext'
import BaseModal from '@/components/BaseModal'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material'
import CustomSwitch from '@/components/CustomSwitch'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers'
import React from 'react'
import NumberInput from '@/components/CustomNumberInput'
import { useTopicContext } from '@/contexts/topicContext'
import { useKnowledgeContext } from '@/contexts/knowledgeContext'
import {
  NewQuizRequest,
  newQuizRequest,
  Quiz,
  quiz,
  QuizView,
  updateQuiz,
  UpdateQuiz
} from '@/lib/quizContracts'

const SettingsSwitch = ({
  loading,
  isActive,
  activeText,
  notActiveText,
  setIsActive
}: {
  loading: boolean
  isActive: boolean
  activeText: string
  notActiveText: string
  setIsActive: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <tr style={{ marginTop: '5px' }}>
      <td>
        <span
          className={`rounded flex w-fit items-center px-2 ${
            isActive
              ? 'bg-blue-100 text-blue-700 '
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Typography>{isActive ? activeText : notActiveText}</Typography>
        </span>
      </td>
      <td style={{ maxWidth: '30px' }}>
        <CustomSwitch
          disabled={loading}
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </td>
    </tr>
  )
}

const GetAccessibilityTimeSelector = ({
  accessibleFrom,
  setAccessibleFrom,
  accessibleTill,
  setAccessibleTill
}: {
  accessibleFrom: string
  setAccessibleFrom: Dispatch<SetStateAction<string>>
  accessibleTill: string
  setAccessibleTill: Dispatch<SetStateAction<string>>
}) => {
  return (
    <td colSpan={2}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        key={'quiz-accessibility-selection'}
      >
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <DateTimePicker
            className='flex my-2 ml-1 max-w-[300px]'
            value={dayjs(accessibleFrom)}
            label={'Accessible From'}
            format='MMM DD, YYYY h:mm:s a'
            defaultValue={dayjs(new Date().toISOString())}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock
            }}
            onChange={(value) =>
              value
                ? setAccessibleFrom(dayjs(value).format())
                : setAccessibleFrom(dayjs().format())
            }
          />
          <DateTimePicker
            className='flex my-2 ml-1 max-w-[300px]'
            value={dayjs(accessibleTill)}
            label={'Accessible Till'}
            format='MMM DD, YYYY h:mm:s a'
            defaultValue={dayjs(new Date().toISOString())}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock
            }}
            onChange={(value) =>
              value
                ? setAccessibleTill(dayjs(value).format())
                : setAccessibleTill(dayjs().format())
            }
          />
        </div>
      </LocalizationProvider>
    </td>
  )
}

export default function QuizCrudModal() {
  const {
    quizModalOpen,
    setQuizModalOpen,
    closeModals,
    addNewQuiz,
    quizToEdit,
    updateQuizData
  } = useQuizContext()
  const { subjectOptions } = useTopicContext()
  const { topicOptionList } = useKnowledgeContext()
  const rootRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [isProtected, setIsProtected] = useState<boolean>(false)
  const [accessCode, setAccessCode] = useState<string>('')
  const [hasAccessibilityConstraint, setHasAccessibilityConstraint] =
    useState<boolean>(false)
  const [accessibleFrom, setAccessibleFrom] = useState<string>(dayjs().format())
  const [accessibleTill, setAccessibleTill] = useState<string>(
    quizToEdit?.accessibleTill
      ? dayjs(quizToEdit.accessibleTill).format()
      : dayjs().format()
  )
  const [hasTimeLimit, setHasTimeLimit] = useState<boolean>(false)
  const [timeLimit, setTimeLimit] = useState<number>(0)
  const [subjectId, setSubjectId] = useState<number | null>(null)
  const [topicId, setTopicId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    quizToEdit ? updateStatesWithEditQuiz(quizToEdit) : resetStates()
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizToEdit])

  const updateStatesWithEditQuiz = (data: QuizView) => {
    setTitle(data.title)
    setDescription(data.description)
    setIsPublic(data.isPublic)
    setIsProtected(data.isProtected)
    setAccessCode('')
    setHasAccessibilityConstraint(data.hasAccessibilityConstraint)
    setHasTimeLimit(data.hasTimeLimit)
    setTimeLimit(data.timeLimitInMinutes)
    setSubjectId(data.subjectId)
    setTopicId(data.topicId)
    setError(null)
  }

  const resetStates = () => {
    setTitle('')
    setDescription('')
    setIsPublic(false)
    setIsProtected(false)
    setAccessCode('')
    setHasAccessibilityConstraint(false)
    setHasTimeLimit(false)
    setTimeLimit(0)
    setSubjectId(null)
    setTopicId(null)
    setError(null)
  }

  const validateAndGetNewQuizData = (): UpdateQuiz | NewQuizRequest | null => {
    const userInputData = {
      title,
      description,
      isPublic,
      isProtected,
      hasAccessibilityConstraint,
      accessibleFrom,
      accessibleTill,
      hasTimeLimit,
      timeLimitInMinutes: timeLimit,
      topicId,
      subjectId
    }
    let outcome
    if (quizToEdit) {
      outcome = updateQuiz.safeParse({
        ...userInputData,
        id: quizToEdit.id,
        created_at: quizToEdit.created_at,
        updated_at: dayjs().format(),
        creatorId: quizToEdit.creatorId
      })
    } else {
      outcome = newQuizRequest.safeParse({ ...userInputData, accessCode })
    }
    if (outcome.success) {
      return outcome.data
    }
    const zodError = JSON.parse(outcome.error.message)
    setError(zodError[0].message)
    return null
  }

  const handleFormSubmission = async () => {
    setLoading(true)
    const validData: UpdateQuiz | NewQuizRequest | null =
      validateAndGetNewQuizData()
    if (validData) {
      setError(null)
      const outcome = quizToEdit
        ? await updateQuizData(validData as UpdateQuiz, accessCode)
        : await addNewQuiz(validData as NewQuizRequest)
      if (typeof outcome == 'string') {
        setError(outcome)
      } else {
        setQuizModalOpen(false)
        resetStates()
      }
    }
    setLoading(false)
    return
  }

  return (
    <BaseModal
      isOpen={quizModalOpen}
      rootRef={rootRef}
      modalTitle='Add New Quiz'
      onClose={closeModals}
    >
      <form>
        <FormControl className='w-full mb-2'>
          <TextField
            className='mt-4'
            placeholder='Title'
            required
            autoComplete='off'
            value={title}
            disabled={loading}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className='mt-4'
            placeholder='Description'
            multiline
            required
            rows={3}
            value={description}
            disabled={loading}
            onChange={(e) => setDescription(e.target.value)}
          />

          <table className='relative'>
            <tbody>
              <SettingsSwitch
                activeText='Public'
                notActiveText='Private'
                isActive={isPublic}
                setIsActive={setIsPublic}
                loading={loading}
              />

              <SettingsSwitch
                activeText='Protected'
                notActiveText='Not Protected'
                isActive={isProtected}
                setIsActive={setIsProtected}
                loading={loading}
              />

              <tr style={{ display: isProtected ? 'table-row' : 'none' }}>
                <td colSpan={2}>
                  <div>
                    <TextField
                      required
                      autoComplete='off'
                      className='relative flex'
                      placeholder={quizToEdit ? 'xxxxxxxxxxx' : 'Access Code'}
                      helperText={
                        quizToEdit ? (
                          <>
                            Reset a password/passkey, <br />
                            Leave it blank if you do not wish to change it.
                          </>
                        ) : (
                          'Set a password/passkey'
                        )
                      }
                      value={accessCode}
                      disabled={loading}
                      onChange={(e) => setAccessCode(e.target.value)}
                    />
                  </div>
                </td>
              </tr>
              <SettingsSwitch
                activeText='Accessibility Constraint'
                notActiveText='Accessibility Constraint'
                isActive={hasAccessibilityConstraint}
                setIsActive={setHasAccessibilityConstraint}
                loading={loading}
              />
              <tr
                style={{
                  display: hasAccessibilityConstraint ? 'table-row' : 'none'
                }}
              >
                <GetAccessibilityTimeSelector
                  accessibleFrom={accessibleFrom}
                  setAccessibleFrom={setAccessibleFrom}
                  accessibleTill={accessibleTill}
                  setAccessibleTill={setAccessibleTill}
                />
              </tr>

              <SettingsSwitch
                activeText='Time Limit'
                notActiveText='No Time Limit'
                isActive={hasTimeLimit}
                setIsActive={setHasTimeLimit}
                loading={loading}
              />

              <tr
                style={{
                  display: hasTimeLimit ? 'table-row' : 'none'
                }}
              >
                <td colSpan={2}>
                  <NumberInput
                    value={timeLimit}
                    min={1}
                    max={1000}
                    aria-label='Time Limit (Minutes)'
                    onChange={(_, val) => {
                      val ? setTimeLimit(val) : setTimeLimit(0)
                    }}
                  />
                  <span className='flex w-full justify-center py-1'>
                    <Typography variant='caption'>
                      {timeLimit ? Math.floor(timeLimit / 60) : 0} Hour/s
                      <strong>{' : '}</strong>
                      {timeLimit ? timeLimit % 60 : 0} Minute/s
                    </Typography>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <Autocomplete
            className='mt-4'
            disablePortal
            id='combo-box-subject-selection'
            disabled={loading}
            value={
              subjectOptions.find(
                (option: { id: number | null }) => option.id === subjectId
              ) || null
            }
            options={subjectOptions}
            getOptionLabel={(option) => option.title}
            getOptionKey={(option) => option.id}
            renderInput={(params) => (
              <TextField required {...params} label='Subjects' />
            )}
            onChange={(_, val) => {
              val ? setSubjectId(val.id) : setSubjectId(null)
            }}
          />
          <Autocomplete
            className='mt-4'
            disablePortal
            id='combo-box-topic-selection'
            disabled={loading}
            value={
              topicOptionList.find(
                (option: { id: number | null }) => option.id === topicId
              ) || null
            }
            options={topicOptionList}
            getOptionLabel={(option) => option.title}
            getOptionKey={(option) => option.id}
            renderInput={(params) => (
              <TextField required {...params} label='Topics' />
            )}
            onChange={(_, val) => {
              val ? setTopicId(val.id) : setTopicId(null)
            }}
          />
        </FormControl>
        {error ? (
          <div className='flex justify-center'>
            <span className='bg-red-100 text-red-700 p-1 rounded text-wrap text-xs'>
              {error}
            </span>
          </div>
        ) : null}
        {loading ? <LinearProgress /> : null}
        <Divider className='py-2' />
        <div className='flex w-full justify-center pt-4'>
          <Button
            variant='contained'
            className='text-2xl px-10 buttonColourDark'
            onClick={handleFormSubmission}
          >
            SAVE
          </Button>
        </div>
      </form>
    </BaseModal>
  )
}
