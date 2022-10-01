import { PrismaClient } from '@prisma/client'
import {
  CreateCategory,
  CreateTopic,
  CreateEssay,
  GetCategories,
  GetTopics,
  GetAllEssays,
  GetCategoryById,
  GetTopicById,
  GetEssayById,
  GetEssaysByTopic,
  GetTopicsByCategory
} from '../types/script'

const prisma = new PrismaClient()

export const createCategory: CreateCategory = async (title, shortTitle, quote, sourceOfQuote) => {
  try {
    const category = await prisma.category.create({
      data: { title, shortTitle, quote, sourceOfQuote }
    })
    await prisma.$disconnect()
    return category
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const createTopic: CreateTopic = async (title, shortTitle, categoryId) => {
  try {
    const topic = await prisma.topic.create({
      data: {
        title,
        shortTitle,
        categoryId
      }
    })
    await prisma.$disconnect()
    return topic
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const createEssay: CreateEssay = async (
  title,
  shortTitle,
  content,
  date,
  age,
  source,
  extraSources,
  pastEssays,
  tags,
  topicId) => {
  try {
    const essay = await prisma.essay.create({
      data: {
        title,
        shortTitle,
        content,
        date,
        age,
        source,
        extraSources,
        pastEssays,
        tags,
        topicId
      }
    })
    await prisma.$disconnect()
    return essay
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getCategories: GetCategories = async () => { // TODO: either pool prisma, or find another way to disconnect
  try {
    const categories = await prisma.category.findMany()
    await prisma.$disconnect()
    return categories
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getTopicsByCategory: GetTopicsByCategory = async (categoryId) => {
  try {
    const topics = await prisma.topic.findMany({
      where: {
        categoryId
      }
    })
    await prisma.$disconnect()
    return topics
  } catch (e) {
    console.error(e) // TODO: throw this error instead
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getTopics: GetTopics = async () => {
  try {
    const topics = await prisma.topic.findMany()
    await prisma.$disconnect()
    return topics
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getTopicIdByTitle = async (title: string): Promise<any> => {
  try {
    const topic = await prisma.topic.findFirstOrThrow({
      where: {
        title
      }
    })
    await prisma.$disconnect()
    return topic.id
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getCategoryById: GetCategoryById = async (categoryId) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId
      }
    })
    await prisma.$disconnect()
    return category
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getTopicById: GetTopicById = async (topicId) => {
  try {
    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId
      }
    })
    await prisma.$disconnect()
    return topic
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getEssaysByTopic: GetEssaysByTopic = async (topicId) => {
  try {
    const essays = await prisma.essay.findMany({
      where: { topicId }
    })
    await prisma.$disconnect()
    return essays
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getAllEssays: GetAllEssays = async () => {
  try {
    const essays = await prisma.essay.findMany()
    await prisma.$disconnect()
    return essays
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getEssayById: GetEssayById = async (essayId) => {
  try {
    const essay = await prisma.essay.findUnique({
      where: {
        id: essayId
      }
    })
    await prisma.$disconnect()
    return essay
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}
