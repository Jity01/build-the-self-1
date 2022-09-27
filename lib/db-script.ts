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
    return topics
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getTopics: GetTopics = async () => {
  try {
    const topics = await prisma.topic.findMany()
    return topics
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
    return essay
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}
