import { createEssay } from '../../lib/db-script'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, shortTitle, content, date, age, source, extraSources, pastEssays, tags, topicId } = req.body
    const essay = await createEssay(title, shortTitle, content, date, age, source, extraSources, pastEssays, tags, topicId)
    res.status(200).json(essay)
  } catch (e) {
    res.status(500) // TODO make more dynamic
  }
}
