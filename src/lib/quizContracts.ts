import { z } from 'zod'

export const quiz = z.object({
  id: z.number().readonly(),
  created_at: z.string().readonly(),
  updated_at: z.string().readonly(),
  title: z.string().min(1, { message: 'Title must be provided' }).readonly(),
  description: z
    .string()
    .min(1, { message: 'Description must be provided' })
    .readonly(),
  creatorId: z.string().readonly(),
  isPublic: z.boolean().readonly(),
  isProtected: z.boolean().readonly(),
  accessCode: z.string().nullable().readonly(),
  hasAccessibilityConstraint: z.boolean().readonly(),
  accessibleFrom: z.string().readonly(),
  accessibleTill: z.string().readonly(),
  hasTimeLimit: z.boolean().readonly(),
  timeLimitInMinutes: z.number().readonly(),
  topicId: z.number().nullable().readonly(),
  subjectId: z.number().nullable().readonly()
})

export type Quiz = z.infer<typeof quiz>

export const updateQuiz = quiz.omit({ accessCode: true })

export type UpdateQuiz = z.infer<typeof updateQuiz>

export const quizView = quiz
  .merge(
    z.object({
      firstName: z.string().readonly(),
      lastName: z.string().readonly(),
      topicTitle: z.string().nullable().readonly(),
      subjectTitle: z.string().nullable().readonly()
    })
  )
  .omit({ accessCode: true })

export type QuizView = z.infer<typeof quizView>

export const quizViewArray = z.array(quizView).readonly()

export type QuizViewArray = z.infer<typeof quizViewArray>

export const quizViewResponse = z.object({
  data: quizViewArray,
  count: z.number().readonly()
})

export type QuizViewResponse = z.infer<typeof quizViewResponse>

export const newQuizRequest = quiz
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    creatorId: true
  })
  .refine(
    (data) =>
      data.isProtected === true
        ? data.accessCode !== null && data.accessCode.length > 0
        : true,
    {
      message: 'Access Code must not be empty when protected is turned ON',
      path: ['accessCode']
    }
  )
  .refine(
    (data) =>
      data.hasTimeLimit === true
        ? data.timeLimitInMinutes !== null && data.timeLimitInMinutes > 0
        : true,
    {
      message: 'Quiz Time Limit must be above 0',
      path: ['timeLimitInMinutes']
    }
  )

export type NewQuizRequest = z.infer<typeof newQuizRequest>
