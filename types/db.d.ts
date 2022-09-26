export interface CategoryTemplate {
  id: number
  title: string
  shortTitle: string
  quote: string
  sourceOfQuote: string
}

export interface TopicTemplate {
  id: number
  title: string
  shortTitle: string
  categoryId: number
}

export interface EssayTemplate {
  id: number
  title: string
  shortTitle: string
  content: string
  date: string
  age: string
  source: string
  extraSources: string
  pastEssays: string
  tags: string
  topicId: string
}
