import { z } from 'zod'

export const subject = z.object({
  id: z.number().readonly(),
  title: z.string().readonly(),
  description: z.string().readonly(),
  isPublic: z.boolean().readonly(),
  created_at: z.string().readonly(),
  updated_at: z.string().readonly(),
  userId: z.string().nullable().readonly(),
  firstName: z.string().nullable().readonly()
})

export type Subject = z.infer<typeof subject>

export const addSubject = subject.omit({
  id: true,
  created_at: true,
  userId: true,
  firstName: true,
  updated_at: true
})

export type AddSubject = z.infer<typeof addSubject>

export const editSubject = subject.omit({
  created_at: true,
  userId: true,
  firstName: true,
  updated_at: true
})

export type EditSubject = z.infer<typeof editSubject>

export const subjectDropDownArray = z
  .array(
    z.object({
      id: z.number().readonly(),
      title: z.string().readonly()
    })
  )
  .readonly()

export type SubjectDropDownArray = z.infer<typeof subjectDropDownArray>
