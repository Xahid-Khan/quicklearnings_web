import { number, z } from 'zod'

export const topicView = z.object({
  id: z.number().readonly(),
  title: z.string().readonly(),
  description: z.string().readonly(),
  isPublic: z.boolean().readonly(),
  created_at: z.string().readonly(),
  updated_at: z.string().readonly(),
  userId: z.string().nullable().readonly(),
  subjectId: z.number().readonly(),
  firstName: z.string().nullable().readonly(),
  subjectName: z.string().readonly()
})

export type TopicView = z.infer<typeof topicView>

export const addTopic = topicView.omit({
  id: true,
  created_at: true,
  userId: true,
  firstName: true,
  updated_at: true,
  subjectName: true
})

export type AddTopic = z.infer<typeof addTopic>

export const editTopic = topicView.omit({
  created_at: true,
  userId: true,
  firstName: true,
  updated_at: true,
  subjectName: true
})

export type EditTopic = z.infer<typeof editTopic>

export const topicDropDownArray = z
  .array(
    z.object({
      id: z.number().readonly(),
      title: z.string().readonly()
    })
  )
  .readonly()

export type TopicDropDownArray = z.infer<typeof topicDropDownArray>
