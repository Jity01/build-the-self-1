import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createCategory = async (title: string, shortTitle: string, quote: string, sourceOfQuote: string): Promise<any> => { // type return, see what prisma can provide u
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

export const createTopic = async (title: string, shortTitle: string, categoryId: number): Promise<any> => { 
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
    process.exit(1) // TODO: what even is this tho
  }
}

export const createEssay = async (title: string, shortTitle: string, content: string, date: string, age: string, source: string, extraSources: string, pastEssays: string, tags: string, topicId: number): Promise<any> => { // shorten args
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

// remove category
// remove topic
// remove essay

// export const removeCategory = async (categoryId: number): Promise<any> => { // would have to delete related records before
//   try {
//     const deletedCategory = await prisma.category.delete({
//       where: { id: categoryId }
//     })
//     console.log(deletedCategory)
//     return deletedCategory
//   } catch (e) {
//     console.error(e)
//     process.exit(1)
//   }
// }

// update category
// update topic
// update essay

// get categories
// get topicsByCategory
// get essaysByTopic
export const getCategories = async (): Promise<any> => {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getTopicsByCategory = async (categoryId: number): Promise<any> => {
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

export const getTopics = async (): Promise<any> => {
  try {
    const topics = await prisma.topic.findMany()
    return topics
  } catch (e) {
    console.error(e)
    await prisma.$disconnect() // TODO should it be explicit??
    process.exit(1)
  }
}

export const getCategoryById = async (categoryId: number): Promise<any> => {
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
