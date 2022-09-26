import { ChangeEvent } from 'react'

export interface Info {
  title: string
  shortTitle: string
  quote: string
  sourceOfQuote: string
  content: string
  source: string
  extraSources: string
  pastEssays: string
  tags: string[]
}
export type Path = string[][]
export type EssayTopic = number
export type MetadataState = number
export type OpenInput = boolean

export type RevealInput = () => void
export type HandleChange = (e: ChangeEvent<HTMLInputElement>) => void
export type HandleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => void
export type HandleSelect = (e: ChangeEvent<HTMLSelectElement>) => void
export type HandleReset = () => void
export type AddToPath = (text: string, url: string) => void
export type ResetPath = () => void
export type RecedePathTo = (newPath: string[][]) => void
export type UpdateEssayTopic = (topicId: number) => void
export type UpdateMetadataState = () => void
