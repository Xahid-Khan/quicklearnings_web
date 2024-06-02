import { z } from 'zod'

export const possibleOption = z.object({
  option: z
    .string()
    .min(1, { message: 'Option Must be between 1 and 128 characters' })
    .max(256, { message: 'Option Must be between 1 and 128 characters' })
    .readonly(),
  usage: z.string().min(1).max(256).readonly()
})

export type PossibleOption = z.infer<typeof possibleOption>

export const possibleOptions = z.array(possibleOption).max(20).readonly()

export type PossibleOptions = z.infer<typeof possibleOptions>

export const grammarOption = z.object({
  grammar: z
    .string()
    .min(1, { message: 'Grammar Must be between 1 and 64 characters' })
    .max(64, { message: 'Grammar Must be between 1 and 64 characters' })
    .readonly(),
  usage: z
    .string()
    .min(1, {
      message: 'Usage/Explanation Must be between 1 and 128 characters'
    })
    .max(256, {
      message: 'Usage/Explanation Must be between 1 and 128 characters'
    })
    .readonly()
})

export type GrammarOption = z.infer<typeof grammarOption>

export const grammarOptions = z.array(grammarOption).max(20).readonly()

export type GrammarOptions = z.infer<typeof grammarOptions>

export const example = z.object({
  prompt: z
    .string()
    .min(1, {
      message: 'Prompt/Inquiry Must be between 1 and 256 characters'
    })
    .max(256, {
      message: 'Prompt/Inquiry Must be between 1 and 256 characters'
    })
    .readonly(),
  solution: z
    .string()
    .min(1, {
      message: 'Solution/Response Must be between 1 and 256 characters'
    })
    .max(256, {
      message: 'Solution/Response Must be between 1 and 256 characters'
    })
    .readonly()
})

export type Example = z.infer<typeof example>

export const examples = z.array(example).min(0).max(20).readonly()

export type Examples = z.infer<typeof examples>

export const updateKnowledge = z.object({
  prompt: z
    .string({
      required_error: 'Prompt is required',
      invalid_type_error: 'Prompt must be a string'
    })
    .min(1, { message: 'Prompt Must be between 1 and 256 characters' })
    .max(256, { message: 'Prompt Must be between 1 and 256 characters' })
    .readonly(),
  solution: z
    .string({
      required_error: 'Solution is required',
      invalid_type_error: 'Solution must be a string'
    })
    .min(1, { message: 'Solution Must be between 1 and 256 characters' })
    .max(256, { message: 'Solution Must be between 1 and 256 characters' })
    .readonly(),
  hint: z.string().min(0).max(256).nullable().readonly(),
  notes: z.string().min(0).max(512).nullable().readonly(),
  topicId: z.number().min(1, { message: 'You must select a topic' }).readonly(),
  options: possibleOptions,
  grammarOptions: grammarOptions,
  examples: examples
})

export type UpdateKnowledge = z.infer<typeof updateKnowledge>

export const knowledge = z
  .object({
    id: z.number().readonly(),
    created_at: z.string().readonly(),
    updated_at: z.string().readonly()
  })
  .merge(updateKnowledge)

export type Knowledge = z.infer<typeof knowledge>

export const knowledgeData = z.array(knowledge).readonly()

export type KnowledgeData = z.infer<typeof knowledgeData>
