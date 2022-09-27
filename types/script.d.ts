import { Prisma } from '@prisma/client'

export type CreateCategory = (title: string, shortTitle: string, quote: string, sourceOfQuote: string) => Promise<Prisma.CategoryGetPayload<{}>>
export type CreateTopic = (title: string, shortTitle: string, categoryId: number) => Promise<Prisma.TopicGetPayload<{}>>
export type CreateEssay = (title: string, shortTitle: string, content: string, date: string, age: string, source: string, extraSources: string, pastEssays: string, tags: string, topicId: number) => Promise<Prisma.EssayGetPayload<{}>>
export type GetCategories = () => Promise<Array<Prisma.CategoryGetPayload<{}>>>
export type GetTopics = () => Promise<Array<Prisma.TopicGetPayload<{}>>>
export type GetAllEssays = () => Promise<Array<Prisma.EssayGetPayload<{}>>>
export type GetCategoryById = (categoryId: number) => Promise<Prisma.CategoryGetPayload<{}> | null>
export type GetTopicById = (topicId: number) => Promise<Prisma.TopicGetPayload<{}> | null>
export type GetEssayById = (essayId: number) => Promise<Prisma.EssayGetPayload<{}> | null>
export type GetTopicsByCategory = (categoryId: number) => Promise<Array<Prisma.TopicGetPayload<{}>>>
export type GetEssaysByTopic = (topicId: number) => Promise<Array<Prisma.EssayGetPayload<{}>>>
